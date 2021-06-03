import fs from 'fs'
import { run } from './process'

function readOutDirNameFromConfig (): string | null {
  const outDirRegExp = new RegExp(/["|']outDir["|']:\s?["|'](.*)["|']/)
  const configData = fs.readFileSync('./tsconfig.json', 'utf8')
  const matchResult = configData.match(outDirRegExp)

  if (matchResult == null) {
    return null
  } else {
    return matchResult[1]
  }
}

export async function build (mode: 'production' | 'development'): Promise<string> {
  const distPath = readOutDirNameFromConfig()
  if (distPath == null) {
    throw new Error('Option "compilerOptions.outDir" must be specified in tsconfig.json.')
  }

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
