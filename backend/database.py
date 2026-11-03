from __future__ import annotations

import os
import sqlite3
from pathlib import Path


DATABASE_PATH = Path(
    os.environ.get(
        "POLICY_DATABASE_PATH",
        Path(__file__).resolve().parent / "data" / "policies.db",
    )
)

SCHEMA = """
CREATE TABLE IF NOT EXISTS policies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    signed_on TEXT NOT NULL,
    expires_on TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Active', 'Expiring soon', 'Expired')),
    document_url TEXT NOT NULL,
    CHECK (length(id) = 36),
    CHECK (date(signed_on) IS NOT NULL),
    CHECK (date(expires_on) IS NOT NULL),
    CHECK (date(expires_on) >= date(signed_on))
);

CREATE INDEX IF NOT EXISTS policies_status_idx ON policies(status);
CREATE INDEX IF NOT EXISTS policies_expires_on_idx ON policies(expires_on);
"""

SEED_POLICIES = [
    (
        "2977b2de-7528-46f6-8dc6-349a965a0b4c",
        "Flexible Work Guidelines",
        "Principles and practical guidance for effective, inclusive hybrid work.",
        "2026-10-14",
        "2027-10-14",
        "Active",
        "/api/policies/2977b2de-7528-46f6-8dc6-349a965a0b4c/document",
    ),
    (
        "108efdb9-68af-459e-9037-a4e6664eb2b3",
        "Information Handling Standard",
        "Requirements for classifying, sharing, retaining, and protecting company information.",
        "2026-09-19",
        "2027-09-19",
        "Active",
        "/api/policies/108efdb9-68af-459e-9037-a4e6664eb2b3/document",
    ),
    (
        "3a5c0cde-2d20-41df-b5e5-5112841af9f3",
        "Responsible AI Guidance",
        "Approved uses, review expectations, and responsible development practices for AI systems.",
        "2026-09-03",
        "2027-03-03",
        "Expiring soon",
        "/api/policies/3a5c0cde-2d20-41df-b5e5-5112841af9f3/document",
    ),
    (
        "861afb35-6e05-4179-9b86-ba9ff57e0ac9",
        "Travel & Expense Policy",
        "Expectations for business travel, purchasing, documentation, and reimbursement.",
        "2026-08-22",
        "2027-08-22",
        "Active",
        "/api/policies/861afb35-6e05-4179-9b86-ba9ff57e0ac9/document",
    ),
    (
        "9286e8b5-65a5-4589-b4c9-cd4ea524d536",
        "Inclusive Events Checklist",
        "Accessibility and inclusion requirements for company meetings and events.",
        "2026-07-30",
        "2027-01-30",
        "Expiring soon",
        "/api/policies/9286e8b5-65a5-4589-b4c9-cd4ea524d536/document",
    ),
    (
        "d69235ce-98bb-45c6-8007-ac6daf105e0d",
        "Supplier Engagement Principles",
        "Standards for selecting, onboarding, and working with external suppliers.",
        "2025-07-12",
        "2026-07-12",
        "Expired",
        "/api/policies/d69235ce-98bb-45c6-8007-ac6daf105e0d/document",
    ),
]


def connect() -> sqlite3.Connection:
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database() -> None:
    with connect() as connection:
        connection.executescript(SCHEMA)
        existing_records = connection.execute("SELECT COUNT(*) FROM policies").fetchone()[0]
        if existing_records == 0:
            connection.executemany(
                """
                INSERT INTO policies (
                    id, name, description, signed_on, expires_on, status, document_url
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                SEED_POLICIES,
            )


def list_policies(query: str | None = None, status: str | None = None) -> list[sqlite3.Row]:
    conditions: list[str] = []
    parameters: list[str] = []

    if query:
        conditions.append("(name LIKE ? COLLATE NOCASE OR description LIKE ? COLLATE NOCASE)")
        search_term = f"%{query.strip()}%"
        parameters.extend([search_term, search_term])

    if status:
        conditions.append("status = ?")
        parameters.append(status)

    where_clause = f"WHERE {' AND '.join(conditions)}" if conditions else ""
    statement = f"""
        SELECT id, name, description, signed_on, expires_on, status, document_url
        FROM policies
        {where_clause}
        ORDER BY expires_on ASC, name ASC
    """

    with connect() as connection:
        return connection.execute(statement, parameters).fetchall()


def get_policy(policy_id: str) -> sqlite3.Row | None:
    with connect() as connection:
        return connection.execute(
            """
            SELECT id, name, description, signed_on, expires_on, status, document_url
            FROM policies
            WHERE id = ?
            """,
            (policy_id,),
        ).fetchone()
