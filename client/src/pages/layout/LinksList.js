import React from "react";
import {Link} from "react-router-dom";

export const LinksList = ({links}) =>{
    if(!links.length){
        return <p className='mx-auto my-auto'>You haven't yet links</p>;
    }

    return(
        <div className="w-100">
            <table className="table w-100">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Open</th>
                </tr>
                </thead>
                <tbody>
                {links.map((link, index)=>{
                    return(
                        <tr key={link._id}>
                            <th scope="row">{index+1}</th>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td><Link to={`/detail/${link._id}`} target='_blank'>Detail</Link></td>
                        </tr>
                    );
                }) }
                </tbody>
            </table>
        </div>

    );
};