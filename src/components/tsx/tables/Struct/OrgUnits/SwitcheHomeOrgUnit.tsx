import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios, { AxiosRequestConfig } from "axios";
import OrgUnit from './InterfaceOrgUnit';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function SwitchLabels(props: any) {
  const {proxy, id, homeOrgUnit} = props;

  const [check, setCheck] = React.useState(homeOrgUnit);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(event.target.checked);
    Save({id:id, name:"", homeOrgUnit:event.target.checked})
  };

  const Save = React.useCallback((data:OrgUnit) => {

    const axiosOption: AxiosRequestConfig = {
        method: 'post',
        url: proxy + '/api/orgunits/sethomeorgunit',
        data: data,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        withCredentials: true,

    };

    (async () => {
        const response = await axios(axiosOption)
        await sleep(1e3);
        const res = await response;

    })();
    },
    [],
)

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={check}
            onChange={handleChange}
            name="checked"
            color="primary"
          />
        }
        label="Home"
      />
     
    </FormGroup>
  );
}
