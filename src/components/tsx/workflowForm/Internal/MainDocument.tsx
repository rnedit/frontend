import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog(props: any) {
  const {propsOpen, callBackClose} = props;
  Moment.locale('ru');

  const classes = useStyles();
  const [open, setOpen] = React.useState(propsOpen);

  const handleClose = () => {
    setOpen(false);
    callBackClose(false);
  };

  const submit = (values:any) => {
    // print the form values to the console
    console.log(values)
  }


  React.useEffect(() => {
      if (propsOpen)
        setOpen(propsOpen)
     }, [propsOpen]);

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>

            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              {!props.id?"Создание внутреннего документа":"Внутренний документ № "+
              props.number+" от "+
              Moment(props.creationDate).format('DD.MM.YYYY')}
            </Typography>

            {!props.id?
             <Button autoFocus color="inherit" onClick={handleClose}>
             Отправить
           </Button>
            :null}
        
            {!props.id?
             <Button autoFocus color="inherit" onClick={handleClose}>
             Сохранить как черновик
           </Button>
            :null}
           

          </Toolbar>
        </AppBar>
        <Internal onSubmit={submit} />
      </Dialog>
    </div>
  );
}
const mapStateToProps = function (state: any) {
  return {
    id: state.internal.id,
    number: state.internal.number,
    creationDate: state.internal.creationDate
  }
}
export default connect(mapStateToProps)(FullScreenDialog);