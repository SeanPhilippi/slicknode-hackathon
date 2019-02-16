import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import GameItems from "./GameItems";

// const GAME_QUERY = gql`
//   query GameQuery {
//     Ps3 {
//       id
//       title
//       date
//       description
//       url
//     }
//   }
// `;

const GAME_QUERY = gql`
  {
    collection {
      id
      title
      date
      description
      url
    }
  }
`;

export class Games extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="display-4 my-3"> PS3 DATA </h1>
        <Query query={GAME_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4> Loading... </h4>;
            if (error) console.log(error);
            return (
              <Fragment>
                {data.collection.map(single => (
                  <GameItems key={single.id} single={single} />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Games;
