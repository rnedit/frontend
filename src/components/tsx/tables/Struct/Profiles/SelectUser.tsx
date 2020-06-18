/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface user {
    username:string,
}

export default function SelectUser(props: any) {
  const {storeUsers} = props;

  const flatProps = {
    options: storeUsers.map((option:user) => option.username),
  };
  const [value, setValue] = React.useState<string | null>(null);

  return (
    <div style={{ width: 200 }}>
      <Autocomplete
        {...flatProps}
        id="flat"
        renderInput={
            (params) => <TextField {...params} label="Пользователь" margin="normal" />}
        value={value}
        onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
            localStorage.setItem("SelectUser",JSON.stringify(newValue))
          }}
      />    
    </div>
  );
}