/* eslint-disable no-use-before-define */
import React, {useEffect} from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);
function SelectRole(props: any) {
  const { Roles } = props;
  const { value, onChange } = props;
  const defaultRole:any[] = [{id:0, name:"ROLE_USER"}]

  const [name, setName] = React.useState<any[]>(value?value:defaultRole);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const data = [{id:0, name:event.target.value}];
    setName(data);
    onChange(data);
  };
  
useEffect(() => {
  onChange(name);
  return () => {
    
  }
}, [])

const classes = useStyles();
return (
  <div >
    <FormControl className={classes.formControl}>
      <InputLabel id="select-role">Роль</InputLabel>
      <Select

        labelId="select-role"
        id="select-role"
        value={name[0].name}
        onChange={handleChange}
    
      >
        <MenuItem value={Roles.USER}>USER</MenuItem>
        <MenuItem value={Roles.MODERATOR}>MODERATOR</MenuItem>
        <MenuItem value={Roles.ADMIN}>ADMIN</MenuItem>
      </Select>
    </FormControl>

  </div>
);
}

export default SelectRole