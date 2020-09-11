import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { uploadFilesApi } from '../../../../api/UploadFiles'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {setUpdateAttachmentIds} from '../../../../reduxactions/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const RemoteSubmitButton = (props: any) => {

    function Alert(props: any) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const classes = useStyles();
    const { selectedFiles, callBackClose, onclick, setUpdateAttachmentId } = props;
    const [uploading, seUploading] = React.useState(false);
    const [text, setTextAlert] = React.useState('null');
    const [typeSeverity, setTypeSeverity] = React.useState('error');
    const [open, setOpen] = React.useState(false);
    const onClick = () => {
        
        if (selectedFiles !== null && selectedFiles !== undefined) {
            seUploading(true);
        
            dopost(selectedFiles).then(r=>{
                setUpdateAttachmentId({ids:r})
                setTextAlert("Регистрация и загрузка файлов прошла успешно!")
                setTypeSeverity("success")
                setOpen(true);
                onclick()
                setTimeout(() => {
                    seUploading(false);
                    callBackClose()

                }, 2000);
               
            })
            
 
        } else {
           
        
            seUploading(false);
            onclick()
            callBackClose()
        }
    }
    async function dopost(selectedFiles:any) {
        let promise = new Promise((resolve, reject) => {
            uploadFilesApi.upload(selectedFiles).then(r => {
                if (r !== null && r !== undefined)
                    if (r?.status === 200) {                            
                        resolve(r.data)
                    }

            }).catch(error => {
                setTextAlert("Error Uploading!")
                setTypeSeverity("error")
                setOpen(true);
                
                console.log(error)
                console.log(error.response)
                resolve(null)
            })
        })
        const result = await promise

        return result;
    }

    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <div>
            <Backdrop className={classes.backdrop} open={uploading} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar 
            anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
            open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeSeverity}>
                    {text}
                </Alert>
            </Snackbar>
            <Button autoFocus color="inherit" onClick={onClick}>
                Отправить
        </Button>
        </div>

    )
}
const mapDispatchToProps = (dispatch: any) => ({
    setUpdateAttachmentId: (data:any) => dispatch(setUpdateAttachmentIds(data)),
    onclick: () => dispatch(submit('InternalForm')),
    
})
export default connect(null, mapDispatchToProps)(RemoteSubmitButton)