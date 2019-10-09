import React, { createContext } from 'react'

export const UserContext = createContext()

export class UserProvider extends React.Component {
    setuser = newuser => {
        this.setState({ datauser: newuser });
    };

    logoutuser = name => {
        this.setState({ datauser: [] });
    };

    state = {
        datauser: [],
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