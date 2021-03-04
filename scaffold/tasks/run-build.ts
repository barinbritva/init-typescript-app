import { build } from './build'
import { finishWithFail, finishWithSuccess } from './process'

try {
  const args = process.argv.slice(2)
  const mode = args.includes('-d') ? 'development' : 'production'

  build(mode)
    .then(finishWithSuccess.bind(null, 'Successfully built.'))
    .catch(finishWithFail)
} catch (error) {
  finishWithFail(error)
}
