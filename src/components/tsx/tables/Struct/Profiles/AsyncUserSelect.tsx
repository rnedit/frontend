import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios, { AxiosRequestConfig } from "axios";

interface User {
  username: string;
  id: string;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous(props:any) {
  const {proxy} = props;

  const {callBackSetUser} = props;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<User[]>([]);
  const loading = open && options.length === 0;

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
      if (active) {
        setOptions(Object.keys(res.data).map((key) => res.data[key]) as User[]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading,proxy]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous"
      style={{ width: 200 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.username === value.username}
      getOptionLabel={(option) => option.username}
      options={options}
      loading={loading}
      loadingText="Загрузка..."
        onChange={(event: React.ChangeEvent<{}>, value: any) => {
           // localStorage.setItem("SelectUser",JSON.stringify(value.username))
           callBackSetUser(value.username)
        }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Пользователь"
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
