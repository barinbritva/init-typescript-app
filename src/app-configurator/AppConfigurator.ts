import * as fs from 'fs'
import * as inquirer from 'inquirer'
import { QuestionCollection } from 'inquirer'
import AppConfig from './AppConfig'
import ConfigProperty from './ConfigProperty'

export default class AppConfigurator {
  public async askUser (): Promise<AppConfig> {
    const questions: QuestionCollection = [
      {
        type: 'list',
        name: ConfigProperty.Type,
        message: 'Project type:',
        choices: ['app', 'libraty']
      },
      {
        type: 'input',
        name: ConfigProperty.Name,
        message: 'Project name:',
        validate (input: string): boolean|string {
          if (input.length === 0) {
            return 'Project name have not to be empty.'
          }

          if (fs.existsSync(input)) {
            return `Folder with name "${input}" already exists.`
          }

          return true
        }
      },
      {
        type: 'input',
        name: ConfigProperty.Author,
        message: 'Author name:'
      }
    ]

    const config = await inquirer.prompt<AppConfig>(questions)
    return config
  }
}
