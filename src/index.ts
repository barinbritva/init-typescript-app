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
