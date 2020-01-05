import React from "react";

export default function Home(){
    let session_user = JSON.parse(window.localStorage.getItem('datauser'));

    return (
        <div>
            <center>PT. Supranusa Sindata Permit System</center> 
            <br/><br/>
            Welcome {session_user.name}
        </div>    
    );
}
