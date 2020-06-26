// @ts-ignore
import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import TreeTableSearch from './TreeTableSearch'

function MaterialTableStruct(props: any) {
    const {t}=props;
    const [dataC, setDataC] = React.useState([]);

    React.useEffect(() => {
        if (dataC.length<=0)
         new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("post")
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
            }, 500);
        })
    }, []);

    return (
        <>
        <TreeTableSearch t={t} dataC={dataC}/>
        </>

    );
}

export default connect()(MaterialTableStruct);