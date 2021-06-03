import fs from 'fs'
import path from 'path'
import AppGenerator from './app-generator/AppGenerator'
import AppConfigurator from './app-configurator/AppConfigurator'
import AppConfig from './app-configurator/AppConfig'

async function createApp (): Promise<AppConfig> {
  const configurator = new AppConfigurator()
  const appConfig = await configurator.askUser()

  const generator = new AppGenerator(appConfig)
  await generator.createApp()

  return appConfig
}

function readAppMeta (): {name: string, version: string} {
  const configData = fs.readFileSync(path.resolve(__dirname, './package.json'), 'utf8')
  const packageJson = JSON.parse(configData)

  if (
    typeof packageJson.name === 'string' &&
    typeof packageJson.version === 'string'
  ) {
    return packageJson
  }

  throw new Error('Can not read "name" and "version" from package.json.')
}

const appMeta = readAppMeta()
console.info(`🚀 ${appMeta.name} v${appMeta.version}\n`)
createApp()
  .then((config: AppConfig) => {
    const message = '\nIt\'s time to craft!' +
      `\n\ncd ${config.name}\nnpm install\nnpm run build:dev` +
      '\n\nFor more information visit https://github.com/barinbritva/init-typescript-app'
    console.info(message)
    process.exit(0)
  })
  .catch((error) => {
    console.error('Failed to create app.', error)
    process.exit(1)
  })
