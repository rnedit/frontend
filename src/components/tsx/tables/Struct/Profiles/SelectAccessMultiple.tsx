import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import {ACCESS} from '../../../../security/EAccess'
import { interfaceACCESS } from './InterfaceAccess';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const access: interfaceACCESS[] = ACCESS


export default function MultipleSelect(props:any) {
  const { t } = useTranslation();
  const { value, onChange } = props;
  const classes = useStyles();
  const [accessName, setAccessName] = React.useState<string[]>([]);
  const arrObj: Array<interfaceACCESS> = value;
  let arr:string[] = [];
  if (arrObj!==null && arrObj!==undefined)
  arrObj.forEach(element=>{
    arr.push(element.info);
  })

  React.useEffect(() => {
    setAccessName(arr)
  }, []);

  //console.log(value)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
   
   setAccessName(event.target.value as string[]);
   let callonChange:Array<interfaceACCESS> = [];
   const tmp:string[] = event.target.value as string[];
   tmp.forEach(element=>{
      access.forEach(a=>{
        if (a.info===element) {
          callonChange.push({name:a.name, id:a.id, info:a.info});
        }
      })
   })
   onChange(callonChange)
  };
  return (
   <>
      <FormControl className={classes.formControl}>
        <InputLabel id="mutiple-checkbox-label" required>{t("ТаблицаПрофайлы.4")}</InputLabel>
        <Select
          labelId="mutiple-checkbox-label"
          id="mutiple-checkbox"
          multiple
          
          value={accessName.length>0?accessName:arr}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {
          access.map((a) => (
            <MenuItem key={a.name} value={a.info} >
              <Checkbox color='primary' checked={accessName.indexOf(a.info) > -1} />
              <ListItemText primary={a.info} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
   </>
  );
}
