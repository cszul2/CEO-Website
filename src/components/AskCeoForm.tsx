import { useState, type FormEvent } from 'react'
import { Icon } from './Icon'

export function AskCeoForm({ compact = false, onSubmitted }: { compact?: boolean; onSubmitted?: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    onSubmitted?.()
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5" role="status">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
          <Icon name="check" className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-white">Demo submission complete</h3>
        <p className="mt-1 text-sm leading-6 text-slate-300">
          Your question was not transmitted or stored. This interaction demonstrates the intended frontend experience.
        </p>
        <button type="button" className="mt-4 text-sm font-semibold text-violet-300 hover:text-violet-200" onClick={() => setSubmitted(false)}>
          Ask another question
        </button>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="demo-note">
        <Icon name="lightbulb" className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
        <span>Prototype only — questions are not transmitted, saved, or reviewed.</span>
      </div>
      <label className="field-label">
        Topic
        <select className="field-control" defaultValue="Strategy" required>
          <option>Strategy</option>
          <option>Customers</option>
          <option>People & culture</option>
          <option>Ways of working</option>
          <option>Other</option>
        </select>
      </label>
      <label className="field-label">
        Your question
        <textarea
          className={`field-control resize-none ${compact ? 'min-h-28' : 'min-h-36'}`}
          placeholder="What would you like the CEO to address?"
          maxLength={600}
          required
        />
      </label>
      <button type="submit" className="primary-button w-full justify-center">
        <Icon name="send" className="h-4 w-4" />
        Submit demo question
      </button>
    </form>
  )
}
