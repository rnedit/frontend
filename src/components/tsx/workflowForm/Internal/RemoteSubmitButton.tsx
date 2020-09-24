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
import { setUpdateAttachmentIds } from '../../../../reduxactions/actions'
import { AddInternalMutation, Exact, InternalSaveRequest, useAddInternalMutation } from '../../generated/graphql'
import { getFormValues, hasSubmitSucceeded, isSubmitting, hasSubmitFailed } from 'redux-form'
import { MutationFunctionOptions } from '@apollo/client';

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

    const [addInternalMutation, { data, loading, error }] = useAddInternalMutation({
        variables: {
            internalSaveRequest: props.values
        },
    });
   
    const classes = useStyles();
    const { selectedFiles, callBackClose, submit, setUpdateAttachmentId, submitSucceeded, submitFailed } = props;
    const [uploading, seUploading] = React.useState(false);
    const [text, setTextAlert] = React.useState('null');
    const [typeSeverity, setTypeSeverity] = React.useState('error');
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const processAddInternal = () => {
            if (selectedFiles !== null && selectedFiles !== undefined) {
                seUploading(true);
    
                dopost(selectedFiles).then(r => {
                    setUpdateAttachmentId({ ids: r })
                    setTextAlert("Регистрация и загрузка файлов прошла успешно!")
                })
    
            } else {
                setTextAlert("Регистрация прошла успешно!")
            }
          //  console.log(values,'values')
            // {
            //     variables: {
            //         internalSaveRequest: values
            //     },
            // }
            addInternalMutation().then(()=>{
                setTypeSeverity("success")
                setOpen(true);
                setTimeout(() => {
                    seUploading(false);
                    callBackClose()
    
                }, 2000);
            }).catch(e=>{
                setTextAlert("Ошибка в регистрации!")
                setTypeSeverity("error")
                setOpen(true);
                console.log(e);
            });
        }
        if (submitFailed) {
            setTextAlert("Форма не отправлена ошибка! Проверьте обязательные поля и повторите попытку.")
            setTypeSeverity("error")
            setOpen(true);
        }
        if (submitSucceeded) {
            processAddInternal()
        }

    }, [submitSucceeded, submitFailed])


    const onClick = () => {
        submit()
    }
    async function dopost(selectedFiles: any) {
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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
    setUpdateAttachmentId: (data: any) => dispatch(setUpdateAttachmentIds(data)),
    submit: () => dispatch(submit('InternalForm')),

})
const mapStateToProps = (state: any) => ({
    values: getFormValues('InternalForm')(state),
    submitSucceeded: hasSubmitSucceeded('InternalForm')(state),
    submitFailed: hasSubmitFailed('InternalForm')(state),
    submitting: isSubmitting('InternalForm')(state),
})
export default connect(mapStateToProps, mapDispatchToProps)(RemoteSubmitButton)