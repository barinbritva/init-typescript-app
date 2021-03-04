import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import AppConfig from '../app-configurator/AppConfig'
import FileCopyParams from './FileCopyParams'

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

        await this.copyFile({
          from: `_licenses/${licenseFile}`,
          to: 'LICENSE',
          data: {
            year: new Date().getFullYear(),
            author: this.config.author
          }
        })
      }
      if (this.config.tsAdvanced) {
        await this.copyFile({
          from: '_tsconfig/tsconfig-advanced.json',
          to: 'tsconfig.json'
        })
      } else {
        await this.copyFile({
          from: '_tsconfig/tsconfig-base.json',
          to: 'tsconfig.json'
        })
      }
      await this.copyFile({
        from: '_tsconfig/tsconfig-dev.json',
        to: 'tsconfig-dev.json'
      })
      await this.copyFile('tasks/process.ts')
      await this.copyFile('tasks/build.ts')
      await this.copyFile('tasks/run-build.ts')
      if (this.config.isNpmPackage) {
        await this.copyFile('tasks/release.ts')
        await this.copyFile('tasks/run-release.ts')
      }
      await this.copyFile({
        from: '_gitignore',
        to: '.gitignore'
      })
      await this.copyFile({
        from: 'package.json.ejs',
        data: {
          name: this.config.name,
          author: this.config.author,
          license: this.config.license,
          isNpmPackage: this.config.isNpmPackage
        }
      })
      await this.copyFile('README.md')
      await this.copyFile('src/Greeter.ts')
      await this.copyFile({
        from: 'src/index.ts.ejs',
        data: {
          author: this.config.author,
          projectName: this.config.name
        }
      })
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

  private async copyFile (fileOptions: FileCopyParams): Promise<string>
  private async copyFile (fileOptions: string): Promise<string>
  private async copyFile (fileOptions: string | FileCopyParams): Promise<string> {
    let from: string
    let to: string | undefined
    let data: Record<string, unknown> | undefined

    if (typeof fileOptions === 'object') {
      from = fileOptions.from
      to = fileOptions.to
      data = fileOptions.data
    } else {
      from = fileOptions
    }

    const copyDestPath: string = this.removeEjsExtensionFromPath(to ?? from)
    const absoluteCopyDestPath: string = path.join(this.projectPath, copyDestPath)
    const absoluteCopyDestDir: string = path.dirname(absoluteCopyDestPath)
    const content: string = await ejs.renderFile(path.join(this.templatesPath, from), data ?? {})
    const isDestFolderExists: boolean = fs.existsSync(absoluteCopyDestDir)

    if (!isDestFolderExists) {
      fs.mkdirSync(absoluteCopyDestDir, { recursive: true })
    }
    fs.writeFileSync(absoluteCopyDestPath, content)

    return absoluteCopyDestPath
  }

  private removeEjsExtensionFromPath (filePath: string): string {
    if (path.extname(filePath) === '.ejs') {
      filePath = filePath.replace('.ejs', '')
    }

    return filePath
  }
}

export default AppGenerator
