import {internalsApi} from '../../../../api/Internals'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function submit(values: any) {
  return sleep(200).then(() => {
   
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
      
         internalsApi.saveInternal(internal)
         .then((r:any)=>{
        
         }).catch(error =>{
          console.log(error)
          console.log(error.response)
         })
  })
}

export default submit