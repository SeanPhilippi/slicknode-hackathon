import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import logo from "./logo.png";
import Games from "./components/Games";

// const client = new ApolloClient({
//   uri: "http://localhost:5000/graphql"
// });

const client = new ApolloClient({
  uri: "https://slicknode-games-3331d560.us-east1.slicknode.com/"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <img
            src={logo}
            alt="PS3"
            style={{
              width: 300,
              display: "block",
              margin: "auto"
            }}
          />
          <Games />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
