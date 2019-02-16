import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import logo from "./logo.png";
import Games from "./components/Games";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import NavBar from "./components/NavBar";

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
        <Router>
          <div>
            <NavBar />
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
              <Route exact path="/" component={Home} />
              <Route path="/games" component={Games} />

            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
