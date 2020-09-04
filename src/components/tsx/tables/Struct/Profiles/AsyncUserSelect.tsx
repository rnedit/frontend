import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {User} from "./InterfaceUser"
import { useTranslation } from 'react-i18next';

import { usersApi } from "../../../../../api/Users"

export default function Asynchronous(props:any) {
  const { defValue, onChange } = props;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<User[]>([]);
  const loading = open && options.length === 0;
  const { t } = useTranslation();
  let arr: any = [];
  if (defValue!==null && defValue!==undefined)
  arr.push({id:"0", username:defValue})

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

      usersApi.parentidisnull()
      .then((r:any)  => {
        if (defValue!==null && defValue!==undefined)
          arr = {...r.data }
        else
          arr = {arr, ...r.data }
          
        if (active) {
          setOptions(Object.keys(arr).map((key) => arr[key]) as User[]);
        }
      })
  
    
    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
      // arr = [];
      // arr.push({id:"0", username:defValue})
    }
  }, [open]);
  return (
    <Autocomplete
      id="asynchronous"
      style={{ width: 200 }}
      open={open}
      defaultValue={defValue===null && defValue===undefined ? undefined:defValue}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => (option.username === value.username || option.username === defValue)}

      getOptionLabel={(option) => option.username===undefined?defValue:option.username}
      
      options={options}
      loading={loading}
      
      loadingText={t("ТаблицаПрофайлы.5")}
      noOptionsText={t("ТаблицаПрофайлы.6")}
      onChange={(event: React.ChangeEvent<{}>, value: any) => {
        if (value!==null && value!==undefined)
           onChange(value.username)
        }}
      
      renderInput={(params) => (
        <TextField
          {...params}
         // defaultValue={value}
          label={t("ТаблицаПрофайлы.3")}
          required
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
