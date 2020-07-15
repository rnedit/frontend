import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios, { AxiosRequestConfig } from "axios";
import OrgUnit from './InterfaceOrgUnit';
import {orgunitsApi} from "../../../../../api/Orgunits"

export default function SwitchLabels(props: any) {
  const {proxy, id, homeOrgUnit} = props;

  const [check, setCheck] = React.useState(homeOrgUnit);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(event.target.checked);
    Save({id:id, name:"", homeOrgUnit:event.target.checked})
  };

  const Save = (data:OrgUnit) => {

    orgunitsApi.sethomeorgunit(data);
  }
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
