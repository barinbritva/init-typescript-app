import { finishWithFail, finishWithSuccess } from './process'
import { release } from './release'

try {
  release()
    .then(finishWithSuccess.bind(null, 'Successfully released.'))
    .catch(finishWithFail)
} catch (error) {
  finishWithFail(error)
}
