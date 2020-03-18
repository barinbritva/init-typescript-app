import ConfigProperty from './ConfigProperty'

export default interface AppConfig {
  [ConfigProperty.Name]: string
  [ConfigProperty.Type]: string
  [ConfigProperty.Author]: string
}
