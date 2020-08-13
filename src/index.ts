import AppGenerator from './app-generator/AppGenerator'
import AppConfigurator from './app-configurator/AppConfigurator'

async function createApp (): Promise<void> {
  const configurator = new AppConfigurator()
  const appConfig = await configurator.askUser()

  console.debug('appConfig', appConfig)

  const generator = new AppGenerator(appConfig)
  await generator.createApp()
  // todo run git init
}

createApp()
  .catch((error) => {
    console.error('Failed to create app.', error)
  })
