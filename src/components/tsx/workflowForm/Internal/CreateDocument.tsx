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
import Internal from "./ReduxFormMainDoc"
import { connect } from 'react-redux';
import Moment from 'moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import RemoteSubmitButton from "./RemoteSubmitButton"
import UploadButton from "../../buttons/UploadButton"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
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

  const { propsOpen, callBackClose} = props;
  Moment.locale('ru');

  const classes = useStyles();
  //const [createOpen, setCreateOpen] = React.useState(propsOpen);
  const [selectedFiles, setSelectedFiles] = React.useState(null);

  const handleClose = () => {
    //setCreateOpen(false);
    callBackClose(false);
  };

  return (
    <div>
      <Dialog id="CreateDialog" fullScreen open={propsOpen} onClose={handleClose} TransitionComponent={TransitionCreate}>
        <AppBar className={classes.appBar}>
          <Toolbar>

            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Создание внутреннего документа
            </Typography>

            <UploadButton callBackSelectedFiles={setSelectedFiles} />

            <RemoteSubmitButton selectedFiles={selectedFiles} callBackClose={handleClose} />
            
            <Button autoFocus color="inherit" onClick={handleClose}>
                Сохранить как черновик
           </Button>
           


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
              <Internal editDocument={true} />
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