import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "./layout/Loader";
import {LinksList} from "./layout/LinksList";

export const LinksPage = () => {
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);
    const [links, setLinks] = useState([]);

    const getLinks = useCallback( async ()=>{
        try{
            const fetched = await request(`/api/links`, 'GET', null, {Authorization: `Bearer ${token}`});
            setLinks(fetched);
        }catch(e){}
    }, [token, request]);

    useEffect(()=>{
        getLinks();
    }, [getLinks]);

    if(loading){
        return <Loader/>
    }
    return (
        <>
            {!loading && <LinksList links={links}/>}
        </>
    );
}