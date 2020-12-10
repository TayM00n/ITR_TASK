import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [link, setLink] = useState("");

    const pressHandler = async (event)=>{
        if(event.key === "Enter"){
            try{
                const data = await request('/api/links/generate', "POST", {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                });
                history.push(`/detail/${data.link._id}`)
            }catch (e) {
                console.log("Error(event Enter)",e.message);
            }
        }
    };

    return (
        <div className="row w-100 text-center">
            <div className="col">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Paste link here <span  className="material-icons"> keyboard_arrow_right</span></span>
                    </div>
                    <input
                        type="text"
                        autoComplete="url"
                        className="form-control"
                        id="link"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                </div>
            </div>
        </div>
    );
}