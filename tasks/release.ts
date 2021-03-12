import fs from 'fs'
import { finishWithFail, run } from './process'

function getVersionFromPackage (): string {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
  return packageJson.version
}

export async function release (): Promise<void> {
  console.info('Check if working directory clean.')
  const gitStatusResult = await run('git status --porcelain')
  if (gitStatusResult !== '') {
    finishWithFail(new Error('Git working directory not clean. Please commit changes or stash them before release.'))
  }

  console.info('Building...')
  await run('npm run build')

  const currentPackageVersion = getVersionFromPackage()

  console.info(`Publish package as ${currentPackageVersion}.`)
  await run('npm publish --access public')

  console.info(`Tag version as ${currentPackageVersion}.`)
  await run(`git tag v${currentPackageVersion}`)

  console.info('Bump package version.')
  const newPackageVersion = getVersionFromPackage()
  const skipPreCommitCommand = process.platform === 'win32' ? 'set HUSKY_SKIP_HOOKS=1' : 'HUSKY_SKIP_HOOKS=1'
  await run('npm --no-git-tag-version version patch')
  await run('git add package.json package-lock.json')
  await run(`${skipPreCommitCommand} && git commit -m "Bump version to ${newPackageVersion}."`)

  console.info('Push changes to Git.')
  await run('git push && git push --tags')
}
