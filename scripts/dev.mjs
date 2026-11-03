import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const apiOnly = process.argv.includes('--api-only')
const pythonPath = process.platform === 'win32'
  ? resolve('.venv', 'Scripts', 'python.exe')
  : resolve('.venv', 'bin', 'python')

if (!existsSync(pythonPath)) {
  console.error('Python environment not found. Run: python3 -m venv .venv && .venv/bin/pip install -r requirements.txt')
  process.exit(1)
}

const children = []
let shuttingDown = false

function start(command, args, label) {
  const child = spawn(command, args, { stdio: 'inherit' })
  children.push(child)
  child.on('exit', (code, signal) => {
    if (shuttingDown) return
    console.error(`${label} stopped${signal ? ` (${signal})` : ` with exit code ${code}`}.`)
    shutdown('SIGTERM')
    process.exitCode = code ?? 1
  })
}

function shutdown(signal) {
  if (shuttingDown) return
  shuttingDown = true
  for (const child of children) {
    if (!child.killed) child.kill(signal)
  }
}

start(
  pythonPath,
  ['-m', 'uvicorn', 'backend.main:app', '--host', '0.0.0.0', '--port', '8000', '--reload'],
  'Policy API',
)

if (!apiOnly) {
  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  start(npmCommand, ['run', 'dev:web'], 'Vite web server')
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
