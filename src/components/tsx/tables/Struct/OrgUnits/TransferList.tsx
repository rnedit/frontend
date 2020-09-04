import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Profile from './InterfaceProfile';
import Progress from './Progress'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
    },
    cardHeader: {
      padding: theme.spacing(1, 2),
    },
    list: {
      width: 325,
      height: 300,
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  }),
);

//  const ou: Array<Object> = _.filter(p, function(o:any) { return o.name==="Группа мам"; })
const _ = require('lodash');

function not(a: Profile[], b: Profile[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: Profile[], b: Profile[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: Profile[], b: Profile[]) {
  return [...a, ...not(b, a)];
}

export default function TransferList(props: any) {
  const { p, pIsNull, CallBack } = props;

  const classes = useStyles();
  const [checked, setChecked] = React.useState<Profile[]>([]);

  const [left, setLeft] = React.useState<Profile[]>(pIsNull as Profile[]);
  const [right, setRight] = React.useState<Profile[]>(p as Profile[]);

  const [leftFilter, setLeftFilter] = React.useState("");
  const [rightFilter, setRightFilter] = React.useState("");

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: Profile) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: Profile[]) => intersection(checked, items).length;

  const handleToggleAll = (items: Profile[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleOnChangeLeft = (event: any) => {
    const { target: { value } } = event;
    setLeftFilter(value)
    if (value.trim()!==""){
      const ou: Profile[] = _.filter(pIsNull, 
        function(o:any) {
          const name: string = _.toLower(o.name)
          const username: string = _.toLower(o.user?.username)
           return name.includes(_.toLower(value)) || username.includes(_.toLower(value)); 
          })
      setLeft(ou);
    } else {
      setLeft(pIsNull);
    }
  };
  
  const handleOnChangeRight = (event: any) => {
    const { target: { value } } = event;
    setRightFilter(value)
    if (value.trim()!==""){
      const ou: Profile[] = _.filter(p, 
        function(o:any) {
          const name: string = _.toLower(o.name)
          const username: string = _.toLower(o.user?.username)
           return name.includes(_.toLower(value)) || username.includes(_.toLower(value)); 
          })
      setRight(ou);
    } else {
      setRight(p);
    }
    
  };

  React.useEffect(() => {
    setLeft(pIsNull);
    setRight(p);
  }, [p, pIsNull]);

  React.useEffect(() => {
    CallBack(right)
}, [right,CallBack]);

  const customList = (title: React.ReactNode, items: Profile[]) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            color='primary'
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} выбраны`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value: Profile) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          
          return (
            <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  color='primary'
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} 
              primary={(value.user!==null && value.user!==undefined)? value.name +' ('+ value.user?.username +')': value.name } />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <>
      { pIsNull.length > 0 ?
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
         
          <Grid item>
          <TextField fullWidth id="left-filter" label="Фильтр" type="text"
           value={leftFilter} onChange={handleOnChangeLeft}/>
            {customList('Доступны', left)}
            
            </Grid>

          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
          </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
          </Button>
            </Grid>
          </Grid>
          <Grid item>
          <TextField fullWidth id="right-filter" label="Фильтр" type="text"
           value={rightFilter} onChange={handleOnChangeRight}/>
            {customList('Выбраны', right)}
            </Grid>
        </Grid>
        : (
          <Box display="flex" width="100%" justifyContent="center" m={1} p={1} bgcolor="background.paper">

            <Box p={1}   >
              <Progress />
            </Box>
          </Box>
        )

      }
    </>


  );
}
