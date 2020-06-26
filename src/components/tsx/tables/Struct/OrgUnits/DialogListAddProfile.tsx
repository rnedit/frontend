import React,{useCallback} from 'react';
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
import axios, { AxiosRequestConfig } from "axios";
import Profile from './InterfaceProfile';
import Tooltip from '@material-ui/core/Tooltip';

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

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

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
    const { proxy, id } = props;
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

            const axiosOption: AxiosRequestConfig = {
                method: 'post',
                url: proxy + '/api/orgunits/getprofilesandprofilesparentidisnull/' + id,
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                withCredentials: true,

            };

            (async () => {
                const response = await axios(axiosOption)
                const res = await response;
                const p: Array<Profile> = res.data.profiles;
                const pParentIdIsNull: Array<Profile> = res.data.profilesParentIdIsNull;

                if (p !== null && p !== undefined)
                    setProfiles(p.map(prof => ({ id: prof.id, name: prof.name })))
                if (pParentIdIsNull !== null && pParentIdIsNull !== undefined)
                    setProfilesParentIdIsNull(pParentIdIsNull.map(prof => ({ id: prof.id, name: prof.name })))

            })();

    }, [loading, proxy]);

    const profilesSelectUserCallBack=(data:Profile[])=>{
        setProfilesSelectUser(data)
    }

    const handleSave = () => {
        Save(profilesSelectUser)
        setOpen(false);
    };

    const Save = useCallback((data:Profile[]) => {

        const axiosOption: AxiosRequestConfig = {
            method: 'post',
            url: proxy + '/api/orgunits/setprofiles/' + id,
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

    React.useEffect(() => {
        if (!open) {
            setProfilesParentIdIsNull([]);
            setProfiles([]);
        }
    }, [open]);

    //const as =()=>{loading===true?<Progress/>:<TransferList/>}; 
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
                        Редактирование прикрепленных должностей
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <TransferList p={profiles} 
                    pIsNull={profilesParentIdIsNull} 
                    CallBack={profilesSelectUserCallBack} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus disabled={profilesParentIdIsNull.length>0?false:true} onClick={handleSave} color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
