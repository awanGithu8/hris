import React, {useContext} from "react";
import {UserContext} from "./context/UserContext";

export default function Home(){
    const user = useContext(UserContext);
    return (
        <div>
            <center>Santuy Human Resources Information System</center> 
            <br/><br/>
            Welcome {user.datauser.name}
        </div>    
    );
}
