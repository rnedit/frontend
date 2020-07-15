// @ts-ignore
import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import TreeTableSearch from './TreeTableSearch'
import useAutocomplete from '@material-ui/lab/useAutocomplete';

function MaterialTableStruct(props: any) {
    const {t}=props;
    const [dataC, setDataC] = React.useState([]);

    const postUpdate = React.useCallback(
        () => {
        new Promise((resolve, reject) => {
            //console.log("post")
            axios.post(props.proxy + '/api/structuretree',
                null,
                { headers:  {'Content-Type': 'application/json; charset=UTF-8'},
                    withCredentials: true })
                .then(res => {
                    resolve()
                    setDataC(res.data)
                })
                .catch(error => {
                    console.log(error)
                    resolve(false)
                })
    })
    },[])

    React.useEffect(() => {
       // if (dataC.length<=0)
            postUpdate()
    }, [postUpdate]);

    return (
        <>
        <TreeTableSearch t={t} dataC={dataC} postUpdate={postUpdate}/>
        </>

    );
}

export default connect()(MaterialTableStruct);