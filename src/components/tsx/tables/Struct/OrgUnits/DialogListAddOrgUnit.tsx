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
import ListIcon from '@material-ui/icons/List';
import Tooltip from '@material-ui/core/Tooltip';
import axios, { AxiosRequestConfig } from "axios";
import OrgUnit from './InterfaceOrgUnit';
import { orgunitsApi } from "../../../../../api/Orgunits"

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
    const loading = open && orgUnitsParentIdIsNull.length === 0 ;

    React.useEffect(() => {
        if (!loading) {
            return undefined;
        }
 
        orgunitsApi.getorgunitsbyparentidisnullandidisnot(id)
        .then((r:any)=>{
            const p: Array<OrgUnit> = r.data.orgUnits;
            const pParentIdIsNull: Array<OrgUnit> = r.data.ParentIdIsNullAndIdIsNot;
            if (p !== null && p !== undefined) 
                setOrgUnits(p.map(prof => ({ id: prof.id, name: prof.name, homeOrgUnit: prof.homeOrgUnit })))              
                           
            if (pParentIdIsNull !== null && pParentIdIsNull !== undefined)
                setOrgUnitsParentIdIsNull(pParentIdIsNull.map(prof => ({ id: prof.id, name: prof.name, homeOrgUnit: prof.homeOrgUnit })))

        })
    }, [loading]);

    const SelectUserCallBack=(data:OrgUnit[])=>{
        setOrgUnitsSelectUser(data)
    }

    const handleSave = () => {
        Save(orgUnitsSelectUser)
        setOpen(false);
    };

    const Save = (data:OrgUnit[]) => {
        orgunitsApi.setorgunits(id,data)
        }

    React.useEffect(() => {
        if (!open) {
            setOrgUnitsParentIdIsNull([]);
            setOrgUnitsSelectUser([]);
        }
    }, [open]);
    
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
                    <Button autoFocus disabled={orgUnitsParentIdIsNull.length>0?false:true} onClick={handleSave} color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
