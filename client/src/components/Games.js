import React, { Component, Fragment } from "react";
import { withRouter, Redirect } from 'react-router-dom';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Alert } from "reactstrap";
import GameItems from "./GameItems";
import LoadingPage from './LoadingPage';
import Footer from "./Footer";

export class Games extends Component {
  state = { isAlertOpen: true };

  closeAlert = () => {
    this.setState({ isAlertOpen: false });
  };

  render() {
    // get user id from end of URL
    const { pathname, state } = this.props.location;
    let id = pathname.split('/');
    id = id[id.length-1];
    console.log(id);

    // redirect to homepage if URL is just /games
    if (id === 'games' || id === '') return <Redirect to="/" />;

    // check if a game was added to the collection
    // if so, display a green alert w/ game title added
    let newGameAlert = null;
    if (state && state.gameAdded) {
      console.log(state);
      newGameAlert = (
        <Alert color="success" isOpen={this.state.isAlertOpen} toggle={this.closeAlert}>
          You added <b>{state.game}</b> to your collection!
        </Alert>
      );
    }

    const QUERY_USER_GAMES = gql`
      {
        user: getUserById(id:"${id}") {
          firstName
          lastName
          gameList: Gamecatalog_games(first: 100) {
            totalCount
            games: edges {
              node {
                id
                title
                description
                releaseDate
                company
                imgUrl
              }
            }
          }
        }
      }
    `;

    return (
      <Fragment>
        <Query query={QUERY_USER_GAMES}>
          {({ loading, error, data }) => {
            if (loading) return <LoadingPage />;

            if (error) console.log(error);

            console.log(data);

            return (
              <Fragment>
                <div className="container mt-3">
                  <h1 className="display-4 text-center mb-4 my-3 ps-blue"> {data.user.firstName+' '+data.user.lastName}'s Games </h1>
                  {newGameAlert}
                  {data.user.gameList.games.map((single, idx) => (
                    <GameItems key={idx} index={idx} single={single} />
                  ))}
                </div>
                <Footer />
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withRouter(Games);
