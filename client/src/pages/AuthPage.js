import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import logo from "./layout/logo.png";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(()=>{
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    };

    const registHandler = async ()=>{
        try{
            const data = await request("/api/auth/registration", "POST", {...form});
            message(data.message);
        }catch(e){}
    };

    const loginHandler = async ()=>{
        try{
            const data = await request("/api/auth/login", "POST", {...form});
            message(data.message);
            auth.login(data.token, data.userId);
        }catch(e){}
    };

    return (
        <div className="row my-auto mx-auto" style={{minWidth: '50%'}}>
            <div className="col w-100">
                <img src={logo} width="100" height="50"
                     className="img-fluid authLogo" alt=""/>
                <div className="card mt-5 bg-light">
                    <div className="card-body">
                        <h3 className="card-title text-center">Authorization</h3>
                        <form className='mt-5'>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    autoComplete="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    autoComplete="current-password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                            </div>
                            {/*<button type="submit" className="btn btn-primary">Submit</button>*/}
                        </form>
                        <hr/>
                        <div className='d-flex justify-content-around'>
                            <button
                                className="nav-link btn btn-outline-info"
                                onClick={loginHandler}
                                style={{color: 'black'}}
                                disabled={loading}>Sign in</button>
                            <button
                                className="nav-link btn btn-outline-info"
                                onClick={registHandler}
                                style={{color: 'black'}}
                                disabled={loading}>Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}