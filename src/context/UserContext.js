import React, { createContext } from 'react'

export const UserContext = createContext()

export class UserProvider extends React.Component {
    setuser = newuser => {
        newuser.password = "******Hacker kau cok?******";
        window.localStorage.setItem('datauser', JSON.stringify(newuser));
        window.location = window.location.origin;
    };

    logoutuser = () => {
        window.localStorage.setItem('datauser', null);
        window.location = window.location.origin;
    };

    state = {
        setuser: this.setuser,
        logoutuser: this.logoutuser
    };

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export const UserConsumer = UserContext.Consumer;
