import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Add from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {setUpdateInternal, setCreateNewInternal} from "../../../reducers/internal";
import InternalDocument from "../workflowForm/Internal/MainDocument"
import { connect } from 'react-redux';

const options = [
  'Создать внутренний документ',
  'Создать приказ',
  'Создать входящий документ',
  'Создать исходящий документ'
];
const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    }
  
}));
const ITEM_HEIGHT = 48;

function LongMenu(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [createInternal, setCreateInternal] = React.useState(false);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCallBackClose = () => {
    setCreateInternal(false)
  }

  const {сreatorProfileId, сreatorProfileName, сreatorRolesId, сreatorUserId} = props;
  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    const indexAttr: number = Number(event.currentTarget.getAttribute("index-attr"));
    if (indexAttr==0) {
      props.setCreateNewInternal( {
        draft: false,
        subject: "",
        сreatorUserId,
        сreatorProfileId,
        сreatorProfileName,
        сreatorRolesId
    } );
      setCreateInternal(true)
    }
       
  };

const drawer = (
    
        <div>
            <InternalDocument propsOpen={createInternal} callBackClose={handleCallBackClose} />
        </div>
        
        );
 
  return (
      
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.root}
      >
        <Add />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 'auto',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={option} selected={option === 'Pyxis'} index-attr={index} onClick={handleClickMenu}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      {drawer}
    </div>
  );
}
const mapStateToProps = function (state: any) {
  return {
    сreatorUserId:  state.currentUser.user.id,
    сreatorProfileId: state.currentUser.user.profile.id,
    сreatorProfileName: state.currentUser.user.profile.name,
    сreatorRolesId: state.currentUser.user.rolesId
  }
}
export default connect(mapStateToProps,{setCreateNewInternal})(LongMenu);