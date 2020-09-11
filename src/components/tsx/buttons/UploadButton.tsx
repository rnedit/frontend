import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {setUpdateAttachmentName} from '../../../reducers/internal'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
    inputb: {
      color: 'white',
    },
  }),
);
interface selectFile {
  selectedFiles: any,
  infoFiles: [info] | null
}

interface info {
  lastModified: number,
          name:string,
          size:number,
          type:string,
}

function UploadButton(props:any) {
  const {callBackSelectedFiles} = props;
  const classes = useStyles();

  const [selectedFiles, setSelectedFiles] = React.useState<selectFile>({
    selectedFiles:null,
    infoFiles:null
  });

  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    let _info: any = [];
    if (selectedFiles!==null && selectedFiles!==undefined) {
      let attachmentNames = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        _info.push({
          lastModified:selectedFiles[i].lastModified,
          name:selectedFiles[i].name,
          size:selectedFiles[i].size,
          type:selectedFiles[i].type,
        })
        attachmentNames.push(selectedFiles[i].name)
        }
      props.setUpdateAttachmentName({names:attachmentNames})
      setSelectedFiles({
        selectedFiles: event.target.files,
        infoFiles:_info
      })
    }
  }

  const checkFiles = (selectedFiles:FileList) => {
    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].size>20480000) {
        alert("AA BIG 20480000 NameFile=" + selectedFiles[i].name)
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    if (selectedFiles.selectedFiles!==null)
      if (checkFiles(selectedFiles.selectedFiles))
        callBackSelectedFiles(selectedFiles)
    return () => {
     // cleanup
    }
  }, [selectedFiles])

  return (
    <div className={classes.root}>
      <input multiple accept="*/*" className={classes.input} name="file" id="icon-button-file" type="file" onChange={selectFiles} />
      <label htmlFor="icon-button-file">
        <IconButton className={classes.inputb} aria-label="upload" component="span">
          <AttachFileIcon />
        </IconButton>
      </label>
    </div>
  );
}

export default connect(null, {setUpdateAttachmentName})(UploadButton)