import fs from 'fs'
import { run } from './process'
import tsconfig from '../tsconfig.json'

export async function build (mode: 'production' | 'development'): Promise<string> {
  const distPath = tsconfig.compilerOptions.outDir
  let buildCommand = 'tsc'

  if (mode === 'development') {
    buildCommand += ' --project ./tsconfig-dev.json'
  }

  console.info('Build mode: ' + mode + '.')

  if (fs.existsSync(distPath)) {
    console.info('Removing previous build...')
    fs.rmdirSync(distPath, { recursive: true })
  }

  console.info('Running command: ' + buildCommand)
  return await run(buildCommand)
}
