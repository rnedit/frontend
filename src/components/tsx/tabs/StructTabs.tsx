import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StructTable from '../tables/StructTable'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto(props:any) {
  const { value } = props;
  const { proxy } = props;
  const classes = useStyles();
  //const [value, setValue] = React.useState(0);

 // const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
 //   setValue(newValue);
 // };

  return (
    <div className={classes.root}>
    
      <TabPanel value={value} index={0}>
        <div style={{ width: '100%' }}>

          <Box >
            <StructTable proxy={proxy}/>
          </Box>

        </div>

      </TabPanel>
      <TabPanel value={value} index={1}>
        Профайлы
      </TabPanel>
      <TabPanel value={value} index={2}>
        Организационная единица
      </TabPanel>
      <TabPanel value={value} index={3}>
        Структура
      </TabPanel>

    </div>
  );
}
