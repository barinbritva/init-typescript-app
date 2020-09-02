import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import AppConfig from '../app-configurator/AppConfig'

class AppGenerator {
  private readonly config: AppConfig
  private readonly projectPath: string
  private readonly templatesPath: string

  constructor (appConfig: AppConfig) {
    this.config = appConfig
    this.projectPath = path.join(process.cwd(), this.config.name)
    this.templatesPath = path.join(__dirname, '../../', 'scaffold')
  }

  public async createApp (): Promise<void> {
    try {
      this.createAppFolder()

      if (this.config.license !== null) {
        const licenseFile = this.config.license.name.replace(/"/g, '')

        await this.copyFile(
          `_licenses/${licenseFile}`,
          {
            year: new Date().getFullYear(),
            author: this.config.author
          },
          'LICENSE'
        )
      }
      if (this.config.tsAdvanced) {
        await this.copyFile('_tsconfig/tsconfig-base.json', {}, 'tsconfig-base.json')
        await this.copyFile('_tsconfig/tsconfig-advanced.json', {}, 'tsconfig.json')
      } else {
        await this.copyFile('_tsconfig/tsconfig-base.json', {}, 'tsconfig.json')
      }
      await this.copyFile('tasks/build.sh')
      await this.copyFile('tasks/release.sh')
      await this.copyFile('.gitignore')
      await this.copyFile(
        'package.json.ejs',
        {
          name: this.config.name,
          author: this.config.author,
          license: this.config.license
        }
      )
      await this.copyFile('README.md')
      await this.copyFile('src/Greeter.ts')
      await this.copyFile(
        'src/index.ts.ejs',
        {
          author: this.config.author,
          projectName: this.config.name
        }
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
    const copyDestPath: string = this.removeEjsExtensionFromPath(destPath ?? tplPath)
    const absoluteCopyDestPath: string = path.join(this.projectPath, copyDestPath)
    const absoluteCopyDestDir: string = path.dirname(absoluteCopyDestPath)
    const content: string = await ejs.renderFile(path.join(this.templatesPath, tplPath), tplData ?? {})
    const isDestFolderExists: boolean = fs.existsSync(absoluteCopyDestDir)

    if (!isDestFolderExists) {
      fs.mkdirSync(absoluteCopyDestDir, { recursive: true })
    }
    fs.writeFileSync(absoluteCopyDestPath, content)
  }

  private removeEjsExtensionFromPath (filePath: string): string {
    if (path.extname(filePath) === '.ejs') {
      filePath = filePath.replace('.ejs', '')
    }

    return filePath
  }
}

export default AppGenerator
