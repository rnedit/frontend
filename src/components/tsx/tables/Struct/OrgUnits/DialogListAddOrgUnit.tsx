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
import ListIcon from '@material-ui/icons/List';
import Tooltip from '@material-ui/core/Tooltip';
import axios, { AxiosRequestConfig } from "axios";
import OrgUnit from './InterfaceOrgUnit';

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
        
    const [orgUnits, setOrgUnits] = React.useState<OrgUnit[]>([]);
    const [orgUnitsParentIdIsNull, setOrgUnitsParentIdIsNull] = React.useState<OrgUnit[]>([]);
    const [orgUnitsSelectUser, setOrgUnitsSelectUser] = React.useState<OrgUnit[]>([]);
    const loading = open && orgUnitsParentIdIsNull.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }
        const axiosOption: AxiosRequestConfig = {
            method: 'post',
            url: proxy + '/api/orgunits/getorgunitsbyparentidisnullandidisnot/' + id,
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            withCredentials: true,

        };

        (async () => {
            const response = await axios(axiosOption)
            await sleep(1e3);
            const res = await response;
            const p: Array<OrgUnit> = res.data.orgUnits;
            const pParentIdIsNull: Array<OrgUnit> = res.data.ParentIdIsNullAndIdIsNot;
            
            if (p !== null && p !== undefined)
                setOrgUnits(p.map(prof => ({ id: prof.id, name: prof.name, homeOrgUnit: prof.homeOrgUnit })))
            if (pParentIdIsNull !== null && pParentIdIsNull !== undefined)
                setOrgUnitsParentIdIsNull(pParentIdIsNull.map(prof => ({ id: prof.id, name: prof.name, homeOrgUnit: prof.homeOrgUnit })))
            return () => {
                active = false;
            };
        })();
    }, [loading, proxy]);

    const SelectUserCallBack=(data:OrgUnit[])=>{
        setOrgUnitsSelectUser(data)
    }

    const handleSave = () => {
        Save(orgUnitsSelectUser)
        setOpen(false);
    };

    const Save = useCallback((data:OrgUnit[]) => {

        const axiosOption: AxiosRequestConfig = {
            method: 'post',
            url: proxy + '/api/orgunits/setorgunits/' + id,
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
            setOrgUnitsParentIdIsNull([]);
            setOrgUnitsSelectUser([]);
        }
    }, [open]);

    //const as =()=>{loading===true?<Progress/>:<TransferList/>}; 
    return (
        <div>
             <Tooltip title="Орг. единица добавить/удалить">
                <IconButton aria-label="add" color="primary" onClick={handleClickOpen}>
                    <ListIcon />
                </IconButton>
             </Tooltip>
           
            <Dialog maxWidth='lg' onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>

                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <div style={{ paddingRight: 100 }}>
                        Редактирование прикрепленных орг. единиц
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <TransferList p={orgUnits} 
                    pIsNull={orgUnitsParentIdIsNull} 
                    CallBack={SelectUserCallBack} />
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
