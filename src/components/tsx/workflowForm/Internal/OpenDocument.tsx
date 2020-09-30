import React from 'react';
import { Redirect } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Internal from "./ReduxFormMainDocOpenDocument"
import { connect } from 'react-redux';
import Moment from 'moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveButton from "../../buttons/SaveButton"
import EditButton from "../../buttons/EditDocumentButton"

import {setInternalApollo} from "../../../../reducers/internal"
import { useGetInternalQuery } from "../../generated/graphql"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // appBar: {
    //   position: 'relative',
    // },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const TransitionOpen = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OpenDialogScreenDialog(props: any) {

  const { propsOpen, callBackClose, editDocument, idDocument} = props;

  Moment.locale('ru');

  let editMainDocument: Boolean = false;
  if (editDocument !== undefined) {
    editMainDocument = editDocument
  }

  const { data, loading, error, networkStatus } = useGetInternalQuery({
    variables: {
       id:idDocument
   },
  });
  
  const classes = useStyles();
  const [selectedFiles, setSelectedFiles] = React.useState(null);

  const [edit, setEdit] = React.useState(editMainDocument)

  const handleClose = () => {
    callBackClose(false);
  };
  const handleBackEdit = (edit: boolean) => {
    setEdit(edit)
  }

  React.useEffect(() => {
    if (loading===false)
      props.setInternalApollo(data?.getInternal)
  }, [loading]);

  if (error) {
    console.log("Apollo Error useGetInternalQuery", error)
    console.log("Apollo NetworkStatus useGetInternalQuery", networkStatus)
    return <Redirect to='/signin' />;
}

  return (
    <div>
      <Dialog id="OpenDialog" fullScreen open={propsOpen} onClose={handleClose} TransitionComponent={TransitionOpen}>
      <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
      </Backdrop>
      {/* className={classes.appBar} */}
        <AppBar position="sticky" >
          <Toolbar>

            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Внутренний документ № {props.number} от {Moment(props.creationDate).format('DD.MM.YYYY')}
            </Typography>

            {/* {edit ?
              <UploadButton callBackSelectedFiles={setSelectedFiles} />
              : null} */}

            {!edit ?
              <EditButton callBackEdit={handleBackEdit} />
              : null
            }

            {(edit && props.id) ?
              <SaveButton callBackClose={handleClose} />
              : null}

            {/* {(edit && (props.id == null && props.id == undefined)) ?
              <RemoteSubmitButton selectedFiles={selectedFiles} callBackClose={handleClose} />
              : null} */}

          </Toolbar>
        </AppBar>
        <React.Fragment>
          <CssBaseline />
          <Container fixed>
            <Typography component="div" style={{
              backgroundColor: 'white',
              //height: '100vh',
              padding: '20px'
            }} >
              <Internal editDocument={edit} />
            </Typography>
          </Container>
        </React.Fragment>

      </Dialog>
    </div>
  );
}
const mapStateToProps = function (state: any) {
  return {
    id: state.internal.id,
    internal: state.internal,
    number: state.internal.number,
    creationDate: state.internal.creationDate
  }
}
export default connect(mapStateToProps,{ setInternalApollo })(OpenDialogScreenDialog);