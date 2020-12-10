import React from "react";

export const LinkCard = ({link}) =>{
    return(
        <div>
            <h2>Link</h2>
            <p>Short link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Full link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Count of click: <strong>{link.clicks}</strong></p>
            <p>Date of create: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    );
};