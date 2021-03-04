import fs from 'fs'
import { run } from './process'

function readOutDirNameFromConfig (): string | null {
  const commentsRegExp = new RegExp(/\/\/(.*)/, 'g')
  let configData = fs.readFileSync('./tsconfig.json', 'utf8')
  configData = configData.replace(commentsRegExp, '')
  const config = JSON.parse(configData)

  if (typeof config === 'object' && config?.compilerOptions?.outDir != null) {
    return String(config.compilerOptions.outDir)
  } else {
    return null
  }
}

export async function build (mode: 'production' | 'development'): Promise<string> {
  const distPath = readOutDirNameFromConfig()
  if (distPath == null) {
    throw new Error('Option "compilerOptions.outDir" is not specified in tsconfig.json.')
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
