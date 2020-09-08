
import { SubmissionError } from 'redux-form'
import {internalsApi} from '../../../../api/Internals'
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function submit(values: any) {

  return sleep(200).then(() => {
    // throw new SubmissionError({
    //     username: 'User does not exist',
    //     _error: 'Login failed!'
    //   })
    let internal: Object = {};
      Object.entries(values).forEach(
       ([key, value]) => {
           if (key!=="_persist") {
            internal = {
              ...internal,
                [key]: value
            }
           }
       })
        //console.log(internal)
        internalsApi.saveInternal(internal)
        .then((r:any)=>{
          console.log(r)
        })
  })
}

export default submit