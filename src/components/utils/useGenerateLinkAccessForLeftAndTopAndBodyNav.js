import React, { useEffect } from 'react';

export default function useGenerateLinkAccessForLeftAndTopAndBodyNav (accessProfile, roleAccess) {
    const [dataAccessProfile, setDataAccessProfile] = React.useState([]);
  
    useEffect(() => {
        let c = 0;
        if (roleAccess || accessProfile.some(e => e.name === "ACCESS_SZ") ) {
            const s = { name: "ACCESS_SZ", count: c++ };
            if (!dataAccessProfile.some(p => p.name === "ACCESS_SZ")) {
               setDataAccessProfile((prevState)=>{
                   return [...prevState, s]
               })
            } 
            else {
                dataAccessProfile.map(p => {
                    if (p.name === "ACCESS_SZ") {
                        setDataAccessProfile((prevState)=>{
                            const data = [...prevState];
                            data[data.indexOf(p)] = s;
                            return data;
                        })
                    }
                    return null;
                })
                
            }

        }
        if (roleAccess || accessProfile.some(e => e.name === "ACCESS_ORD")) {
            const s = { name: "ACCESS_ORD", count: c++ };
            if (!dataAccessProfile.some(p => p.name === "ACCESS_ORD")) {
                setDataAccessProfile((prevState)=>{
                    return [...prevState, s]
                })
            } 
            else {
                dataAccessProfile.map(p => {
                    if (p.name === "ACCESS_ORD") {
                        setDataAccessProfile((prevState)=>{
                            const data = [...prevState];
                            data[data.indexOf(p)] = s;
                            return data;
                        })
                    }
                    return null;
                })
                
            }
        }
        if (roleAccess || accessProfile.some(e => e.name === "ACCESS_INDOC") ) {
            const s = { name: "ACCESS_INDOC", count: c++ };
            if (!dataAccessProfile.some(p => p.name === "ACCESS_INDOC")) {
                setDataAccessProfile((prevState)=>{
                    return [...prevState, s]
                })
            } 
            else {
                dataAccessProfile.map(p => {
                    if (p.name === "ACCESS_INDOC") {
                        setDataAccessProfile((prevState)=>{
                            const data = [...prevState];
                            data[data.indexOf(p)] = s;
                            return data;
                        })
                    }
                    return null;
                })
                
            }
        }
        if ( roleAccess || accessProfile.some(e => e.name === "ACCESS_OUTDOC") ) {
            const s = { name: "ACCESS_OUTDOC", count: c++ };
            if (!dataAccessProfile.some(p => p.name === "ACCESS_OUTDOC")) {
                setDataAccessProfile((prevState)=>{
                    return [...prevState, s]
                })
            } 
            else {
                dataAccessProfile.map(p => {
                    if (p.name === "ACCESS_OUTDOC") {
                        setDataAccessProfile((prevState)=>{
                            const data = [...prevState];
                            data[data.indexOf(p)] = s;
                            return data;
                        })
                    }
                    return null;
                })
                
            }
        }
        if (roleAccess || accessProfile.some(e => e.name === "ACCESS_STRUCT")) {
            const s = { name: "ACCESS_STRUCT", count: c++ };
            if (!dataAccessProfile.some(p => p.name === "ACCESS_STRUCT")) {
               setDataAccessProfile((prevState)=>{
                return [...prevState, s]
            })
            } 
            else {
                dataAccessProfile.map(p => {
                    if (p.name === "ACCESS_STRUCT") {
                        setDataAccessProfile((prevState)=>{
                            const data = [...prevState];
                            data[data.indexOf(p)] = s;
                            return data;
                        })
                    }
                    return null;
                })
                
            }
        }
        if (roleAccess || accessProfile.some(e => e.name === "ACCESS_SPRAV") ) {
            const s = { name: "ACCESS_SPRAV", count: c++ };
            if (!dataAccessProfile.some(p => p.name === "ACCESS_SPRAV")) {
                setDataAccessProfile((prevState)=>{
                    return [...prevState, s]
                })
            } 
             else {
                dataAccessProfile.map(p => {
                    if (p.name === "ACCESS_SPRAV") {
                        setDataAccessProfile((prevState)=>{
                            const data = [...prevState];
                            data[data.indexOf(p)] = s;
                            return data;
                        })
                    }
                    return null;
                })
                
            }
         }
    
    },[accessProfile])

    return dataAccessProfile.sort((a, b) => a.count - b.count );
}

