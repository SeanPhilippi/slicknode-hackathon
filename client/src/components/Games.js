import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

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
      date
      description
      id
      url
      title
    }
  }
`;

export class Games extends Component {
  render() {
    return (
      <div>
        <h1 className="display-4 my-3">PS3 DATA</h1>
        <Query query={GAME_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4> Loading... </h4>;
            if (error) console.log(error);
            console.log(data);
            return <h1>test</h1>;
          }}
        </Query>
      </div>
    );
  }
}

export default Games;
