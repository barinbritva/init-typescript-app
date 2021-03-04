import { exec } from 'child_process'

export function finishWithFail (error: Error): void {
  console.error(error)
  process.exit(1)
}

export function finishWithSuccess (message?: string): void {
  if (message != null) {
    console.info(message)
  }
  process.exit(0)
}

export async function run (command: string): Promise<string> {
  return await new Promise(function (resolve, reject) {
    const output: string[] = []

    const child = exec(command, {
      cwd: process.cwd(),
      env: process.env
    })

    if (child.stdout != null) {
      child.stdout.on('data', function (data) {
        console.log(data)
        output.push(data.toString())
      })
    }

    if (child.stderr != null) {
      child.stderr.on('data', function (data) {
        console.log(data)
        output.push(data.toString())
      })
    }

    child.on('exit', function (code) {
      const outputString = output.join('\n')

      if (code === 0) {
        resolve(outputString)
      } else {
        const errorMessage = {
          code: code,
          message: outputString
        }
        reject(new Error(JSON.stringify(errorMessage)))
      }
    })
    child.on('error', reject)
  })
}
