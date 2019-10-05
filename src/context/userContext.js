import React, { createContext } from 'react';

const UserContext = createContext();

export class UserProvider extends React.Component {
  login = datalogin => {
    this.setState({ datalogin: [] });
  };

  logout = datalogin => {
    this.setState({ datalogin: [] });
  };

  state = {
    datalogin: [],
    login: this.login,
    logout: this.logout
  };

  render() {
    return (
      <UserContext.Provider datalogin={this.state} login={this.login}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const UserConsumer = UserContext.Consumer;
