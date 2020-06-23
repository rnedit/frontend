import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios, { AxiosRequestConfig } from "axios";
import {User} from "./InterfaceProfile"
import { useTranslation } from 'react-i18next';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous(props:any) {
  const {proxy} = props;
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

    const axiosOption: AxiosRequestConfig = {
        method: 'post',
        url: proxy+'/api/users/parentidnotnull',
        headers:{'Content-Type': 'application/json; charset=UTF-8'},
        withCredentials: true,
       
      };

    (async () => {
      const response = await axios(axiosOption)
      await sleep(1e3);
      const res = await response;
      const a:[] = res.data;
      a.forEach(element => {
      arr.push(element)
      })
      if (active) {
        setOptions(Object.keys(arr).map((key) => arr[key]) as User[]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading,proxy]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
      arr = [];
      arr.push({id:"0", username:defValue})
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
