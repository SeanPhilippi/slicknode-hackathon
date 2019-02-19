import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router-dom';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import GameItems from "./GameItems";
import LoadingPage from './LoadingPage';


export class Games extends Component {
  render() {
    // get user id from end of URL
    const { pathname } = this.props.location;
    let id = pathname.split('/');
    id = id[id.length-1];
    console.log(id);

    const QUERY_USER_GAMES = gql`
      {
        user: getUserById(id:"${id}") {
          firstName
          lastName
          gameList: Gamecatalog_games {
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
                  {data.user.gameList.games.map((single, idx) => (
                    <GameItems key={idx} index={idx} single={single} />
                  ))}
                </div>
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withRouter(Games);
