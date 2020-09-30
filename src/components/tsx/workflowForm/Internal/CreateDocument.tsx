import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import CreateInternal from "./ReduxFormMainDocCreateDocument"
import { connect } from 'react-redux';
import Moment from 'moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import RemoteSubmitButton from "./RemoteSubmitButton"
import UploadButton from "../../buttons/UploadButton"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetProfilesByParentIdNotNullDocument, useGetProfilesByParentIdNotNullQuery } from "../../generated/graphql"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
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

const TransitionCreate = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateScreenDialog(props: any) {

  const { callBackClose, id } = props;
  Moment.locale('ru');

  const classes = useStyles();
  const [selectedFiles, setSelectedFiles] = React.useState(null);

  const handleClose = () => {
    callBackClose(false);
  };

  const { data, loading, error } = useGetProfilesByParentIdNotNullQuery({
    variables: {
    },
  });

const drawButton: any = (<>
    <UploadButton callBackSelectedFiles={setSelectedFiles} />
    <RemoteSubmitButton selectedFiles={selectedFiles} callBackClose={handleClose} />
    <Button autoFocus color="inherit" onClick={handleClose}>
      Сохранить как черновик
    </Button>
  </>)

  return (
    <div>
      <Dialog id="CreateDialog" fullScreen open={true} onClose={handleClose} TransitionComponent={TransitionCreate}>
        <AppBar position="sticky" >
          <Toolbar>

            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Создание внутреннего документа
            </Typography>

           {drawButton}

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
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
              <CreateInternal editDocument={true} profiles={data} />
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
export default connect(mapStateToProps)(CreateScreenDialog);