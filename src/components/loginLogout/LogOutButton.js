import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { grey } from '@material-ui/core/colors/';
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import {useHistory} from "react-router-dom";
import {defaultUser, editCurrentUser} from "../../App";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

export default function LogOutButton() {
    let history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleOnClick = () => {
        history.push('/signin')
        editCurrentUser(defaultUser)
    }


    const open = Boolean(anchorEl);
    return (
        <div className={classes.root}>
                <IconButton onClick={handleOnClick} aria-label="logout"
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}

                >
                    <ExitToAppTwoToneIcon />
                </IconButton>
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography>Выйти</Typography>
                </Popover>
        </div>
    );
}