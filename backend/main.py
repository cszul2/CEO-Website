from __future__ import annotations

from contextlib import asynccontextmanager
from datetime import date
from enum import Enum
from html import escape
from typing import Annotated
from uuid import UUID

from fastapi import FastAPI, HTTPException, Path, Query
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, ConfigDict

from backend.database import get_policy, initialize_database, list_policies


class PolicyStatus(str, Enum):
    active = "Active"
    expiring_soon = "Expiring soon"
    expired = "Expired"


class PolicyRecord(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    description: str
    signed_on: date
    expires_on: date
    status: PolicyStatus
    document_url: str


@asynccontextmanager
async def lifespan(_: FastAPI):
    initialize_database()
    yield


app = FastAPI(
    title="Office of the CEO Policy API",
    summary="OpenAPI service for policy and guidance records.",
    description=(
        "Reads policy metadata and document links from the prototype SQLite database. "
        "The generated OpenAPI 3 schema is available at /openapi.json."
    ),
    version="1.0.0",
    lifespan=lifespan,
    openapi_tags=[
        {"name": "policies", "description": "Policy and guidance discovery."},
        {"name": "system", "description": "Service health and readiness."},
    ],
)


def to_policy_record(row: object) -> PolicyRecord:
    return PolicyRecord.model_validate(dict(row))  # type: ignore[arg-type]


@app.get(
    "/api/policies",
    response_model=list[PolicyRecord],
    tags=["policies"],
    operation_id="listPolicies",
    summary="List policy documents",
)
def read_policies(
    q: Annotated[
        str | None,
        Query(min_length=1, max_length=100, description="Search policy names and descriptions."),
    ] = None,
    status: Annotated[
        PolicyStatus | None,
        Query(description="Return only policies with this document status."),
    ] = None,
) -> list[PolicyRecord]:
    rows = list_policies(query=q, status=status.value if status else None)
    return [to_policy_record(row) for row in rows]


@app.get(
    "/api/policies/{policy_id}",
    response_model=PolicyRecord,
    tags=["policies"],
    operation_id="getPolicy",
    summary="Get one policy document",
)
def read_policy(
    policy_id: Annotated[UUID, Path(description="The policy's UUIDv4 identifier.")],
) -> PolicyRecord:
    row = get_policy(str(policy_id))
    if row is None:
        raise HTTPException(status_code=404, detail="Policy document not found")
    return to_policy_record(row)


@app.get(
    "/api/policies/{policy_id}/document",
    response_class=HTMLResponse,
    tags=["policies"],
    operation_id="openPolicyDocument",
    summary="Open the prototype policy document",
)
def open_policy_document(
    policy_id: Annotated[UUID, Path(description="The policy's UUIDv4 identifier.")],
) -> HTMLResponse:
    row = get_policy(str(policy_id))
    if row is None:
        raise HTTPException(status_code=404, detail="Policy document not found")

    policy = dict(row)
    content = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{escape(policy['name'])}</title>
    <style>
      body {{ margin: 0; background: #060c19; color: #cbd5e1; font: 16px/1.7 Inter, system-ui, sans-serif; }}
      main {{ max-width: 760px; margin: 64px auto; padding: 0 24px; }}
      article {{ border: 1px solid #26334c; border-radius: 16px; background: #101a2d; padding: 32px; }}
      h1 {{ margin: 0 0 12px; color: white; line-height: 1.2; }}
      dl {{ display: grid; grid-template-columns: max-content 1fr; gap: 8px 20px; margin-top: 28px; }}
      dt {{ color: #94a3b8; }} dd {{ margin: 0; color: white; }} code {{ color: #a78bfa; }}
      .note {{ margin-top: 28px; border-top: 1px solid #26334c; padding-top: 20px; color: #94a3b8; font-size: 14px; }}
    </style>
  </head>
  <body>
    <main>
      <article>
        <h1>{escape(policy['name'])}</h1>
        <p>{escape(policy['description'])}</p>
        <dl>
          <dt>Document ID</dt><dd><code>{escape(policy['id'])}</code></dd>
          <dt>Signed</dt><dd>{escape(policy['signed_on'])}</dd>
          <dt>Expires</dt><dd>{escape(policy['expires_on'])}</dd>
          <dt>Status</dt><dd>{escape(policy['status'])}</dd>
        </dl>
        <p class="note">Prototype policy document generated from the SQLite record.</p>
      </article>
    </main>
  </body>
</html>"""
    return HTMLResponse(content=content)


@app.get(
    "/api/health",
    tags=["system"],
    operation_id="getHealth",
    summary="Check API health",
)
def health() -> dict[str, str]:
    return {"status": "ok"}
