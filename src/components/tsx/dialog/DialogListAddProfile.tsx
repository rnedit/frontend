import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TransferList from './TransferList';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Profile from './InterfaceProfile';
import Tooltip from '@material-ui/core/Tooltip';
import { orgunitsApi } from "../../../api/Orgunits"
import { profilesApi } from "../../../api/Profiles"

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        dialogWidth: {
            minWidth: 500,
            minHeight: 300,
        },

    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CustomizedDialogs(props: any) {
    const { type, id } = props;
    const {callBackInternal, multiple} = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
        
    const [profiles, setProfiles] = React.useState<Profile[]>([]);
    const [profilesParentIdIsNull, setProfilesParentIdIsNull] = React.useState<Profile[]>([]);
    const [profilesSelectUser, setProfilesSelectUser] = React.useState<Profile[]>([]);
    const loading = open && profilesParentIdIsNull.length === 0;

    React.useEffect(() => {

        if (!loading) {
            return undefined;
        }
        switch (type) {
            case "Struct":
                orgunitsApi.getprofilesandprofilesparentidisnull(id)
                .then((r:any)=>{
                    const p: Array<Profile> = r.data.profiles;
                    const pParentIdIsNull: Array<Profile> = r.data.profilesParentIdIsNull;
                    if (p !== null && p !== undefined)
                    setProfiles(p.map(prof => ({ id: prof.id, name: prof.name,
                        user: { username: prof.user.username } })))
                if (pParentIdIsNull !== null && pParentIdIsNull !== undefined)
                    setProfilesParentIdIsNull(pParentIdIsNull.map(prof => ({ id: prof.id, name: prof.name, 
                        user: { username: prof.user.username }  })))
                })
                break;
            case "Internal":
                profilesApi.getProfilesByParentIdNotNull()
                .then((r:any)=>{
                    const p: Array<Profile> = r.data;
                    setProfilesParentIdIsNull(p.map(prof => ({ id: prof.id, name: prof.name,
                        user: { username: prof.user.username } })))
                })
                
                break;
            default:
                break;
        }

    }, [loading]);

    const profilesSelectUserCallBack=(data:Profile[])=>{
        setProfilesSelectUser(data)
    }

    const handleSave = () => {
        switch (type) {
            case "Struct":
                Save(profilesSelectUser)
                break;

            case "Internal":
                   callBackInternal(profilesSelectUser)
                break;

            default:
                break;
        }
       
        setOpen(false);
    };

    const Save = (data:Profile[]) => {

        orgunitsApi.saveProfiles(id,data).then((r:any)=>{
            console.log("saved")
        })
        }

    React.useEffect(() => {
        if (!open) {
            setProfilesParentIdIsNull([]);
            setProfiles([]);
        }
    }, [open]);

    return (
        <div>
            <Tooltip title="Должности добавить/удалить">
                <IconButton aria-label="add" color="primary" onClick={handleClickOpen}>
                    <AccountCircleIcon />
                </IconButton>
            </Tooltip>
           
            <Dialog maxWidth='lg' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>

                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <div style={{ paddingRight: 100 }}>
                        Добавить/удалить должность
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <TransferList p={profiles}
                    multiple={multiple}
                    pIsNull={profilesParentIdIsNull} 
                    CallBack={profilesSelectUserCallBack} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSave} color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
