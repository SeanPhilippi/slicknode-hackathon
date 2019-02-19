import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import Games from "./components/Games";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NavBar from "./components/NavBar";
import LoadingTest from "./components/LoadingPage";

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
          <div style={{ height: '100%' }}>
            <NavBar />
            {/*<div className="container">*/}

              <Route exact path="/" component={Home} />
              <Route path="/games" component={Games} />
              <Route path="/loading" component={LoadingTest} />

            {/*</div>*/}
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
