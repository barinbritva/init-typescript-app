import ConfigProperty from './ConfigProperty'
import License from './License'

export default interface AppConfig {
  [ConfigProperty.Author]: string
  [ConfigProperty.Name]: string
  [ConfigProperty.License]: License | null
  [ConfigProperty.TsAdvanced]: boolean
}
