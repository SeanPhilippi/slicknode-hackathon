import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import GameItems from "./GameItems";

// const GAME_QUERY = gql`
//   {
//     collection {
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
        getUserByEmail(email:"zgutier5@gmail.com") {
            firstName
            lastName
            Gamecatalog_games {
                totalCount
                edges {
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

export class Games extends Component {
  render() {
    return (
      <Fragment>
        <Query query={GAME_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4> Loading... </h4>;
            if (error) console.log(error);
            console.log(data);
            return (
              <Fragment>
                <h1 className="display-4 text-center mb-3 my-3"> PS3 DATA - {data.getUserByEmail.firstName+' '+data.getUserByEmail.lastName}'s Games </h1>
                {data.getUserByEmail.Gamecatalog_games.edges.map((single, idx) => (
                  <GameItems key={idx} index={idx} single={single} />
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
