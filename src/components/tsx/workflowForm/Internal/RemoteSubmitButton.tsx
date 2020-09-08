import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import Button from '@material-ui/core/Button';

const RemoteSubmitButton = ( props: any ) => {
    const {callBackClose, onclick} = props;
   
    const onClick=()=>{
        onclick()
        callBackClose()
    }

    return (
        <Button autoFocus color="inherit" onClick={onClick}>
             Отправить
        </Button>
    )
}
const mapDispatchToProps = (dispatch:any) => ({
    onclick:() => dispatch(submit('InternalForm'))
  })
export default connect(null,mapDispatchToProps)(RemoteSubmitButton)