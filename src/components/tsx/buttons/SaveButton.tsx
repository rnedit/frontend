import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const SaveButton = (props: any) => {

    function Alert(props: any) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const classes = useStyles();
    const { callBackClose, onclick } = props;
    const [uploading, seUploading] = React.useState(false);
    const [text, setTextAlert] = React.useState('null');
    const [typeSeverity, setTypeSeverity] = React.useState('error');
    const [open, setOpen] = React.useState(false);
    const onClick = () => {
        
            seUploading(true);
        
                setTextAlert("Сохранение успешно!")
                setTypeSeverity("success")
                setOpen(true);
                onclick()
                setTimeout(() => {
                    seUploading(false);
                    callBackClose()

                }, 2000);
               
           
        
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
                Обновить и Сохранить
        </Button>
        </div>

    )
}
const mapDispatchToProps = (dispatch: any) => ({
  //  setUpdateAttachmentId: (data:any) => dispatch(setUpdateAttachmentIds(data)),
    onclick: () => dispatch(submit('InternalForm')),
    
})
export default connect(null, mapDispatchToProps)(SaveButton)