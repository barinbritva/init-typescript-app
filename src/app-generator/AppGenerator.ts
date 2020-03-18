import * as fs from 'fs'
import * as path from 'path'
import * as ejs from 'ejs'
import AppConfig from '../app-configurator/AppConfig'

class AppGenerator {
  private readonly config: AppConfig;
  private readonly projectPath: string;
  private readonly templatesPath: string;
  private readonly appTemplatesPath: string;
  private readonly contextTemplatesPath: string;

  constructor (appConfig: AppConfig) {
    this.config = appConfig
    this.projectPath = path.join(process.cwd(), this.config.name)
    this.templatesPath = path.join(process.cwd(), 'scaffold/templates')
    this.appTemplatesPath = path.join(this.templatesPath, 'app')
    this.contextTemplatesPath = this.appTemplatesPath
  }

  public async createApp (): Promise<void> {
    try {
      this.createAppFolder()
      await this.copyFile(
        'package.json',
        {
          name: this.config.name,
          author: this.config.author
        }
      )
      await this.copyFile(
        '_licenses/MIT License',
        {
          year: new Date().getFullYear(),
          author: this.config.author
        },
        'LICENSE'
      )
    } catch (error) {
      await this.removeAppFolder()
      throw error
    }
  }

  private createAppFolder (): void {
    fs.mkdirSync(this.config.name)
  }

  private removeAppFolder (): void {
    fs.rmdirSync(this.config.name, { recursive: true })
  }

  private async copyFile (tplPath: string, tplData?: object, destPath?: string): Promise<void> {
    const copyDestPath: string = destPath ?? tplPath
    const content = await ejs.renderFile(path.join(this.contextTemplatesPath, tplPath), tplData)

    fs.writeFileSync(path.join(this.projectPath, copyDestPath), content)
  }
}

export default AppGenerator
