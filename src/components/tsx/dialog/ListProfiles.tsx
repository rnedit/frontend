import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Profile from './InterfaceProfile'
import axios, { AxiosRequestConfig } from "axios";
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import { orgunitsApi } from "../../../api/Orgunits"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    progress: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function ChipsArray(props: any) {
  const { proxy, id } = props;
  const classes = useStyles();
  const [chipData, setChipData] = React.useState<Profile[]>([]);
  const [loading, setLoading] = React.useState(true);
  const loading1 = chipData.length === 0;

  React.useEffect(() => {

    if (!loading1) {
      return undefined;
    }
 
    orgunitsApi.getprofiles(id)
    .then((r:any)=>{
      const p: Array<Profile> = r.data.profiles;
      if (p !== null && p !== undefined && p.length>0)
        setChipData(p.map(prof => ({ id: prof.id, name: prof.name, user: { username: prof.user.username } })))
      else 
       setLoading(false);
    })
  }, []);

  return (
    <Paper component="ul" className={classes.root}>
      {chipData.length > 0 ?
        chipData.map((data) => {

          let icon = <AccountCircleIcon />;

          return (
            <li key={data.id}>
              <Chip
                size="small"
                variant="outlined"
                color="primary"
                icon={icon}
                label={data.name + " ("+data.user.username+")"}
                className={classes.chip}
              />
            </li>
          );
        })
        : loading===true?
          <div className={classes.progress}>
          <Box p={2} >
            <LinearProgress />
          </Box>
        </div>
        :"Пусто..."
        
       
       
      }


    </Paper>
  );
}
