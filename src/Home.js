import React from "react";

export default function Home(){
    let session_user = JSON.parse(window.localStorage.getItem('datauser'));

    return (
        <div>
            <center>Santuy Human Resources Information System</center> 
            <br/><br/>
            Welcome {session_user.name}
        </div>    
    );
}
