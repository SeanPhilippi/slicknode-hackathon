import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import GameItems from "./GameItems";
import { withRouter } from 'react-router-dom';
import gif from '../playstation.gif';

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

const divFlex = {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#145CB2',
  padding: '0',
  margin: '0'
}

const loadGif = {
  width: '60%',
}

export class Games extends Component {
  render() {
    const { pathname } = this.props.location;
    let id = pathname.split('/');
    id = id[id.length-1];
    console.log(id);

    const GAME_QUERY = gql`
        {
            getUserById(id:"${id}") {
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



    return (
      <Fragment>
        <Query query={GAME_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return (
              <div style={divFlex}>
                <img style={loadGif} src={gif} alt=""/>
                {/* <h4 className="text-center"> Loading... </h4> */}
              </div>
            );
            if (error) console.log(error);
            console.log(data);
            return (
              <Fragment>
                <h1 className="display-4 text-center mb-3 my-3"> {data.getUserById.firstName+' '+data.getUserById.lastName}'s Games </h1>
                {data.getUserById.Gamecatalog_games.edges.map((single, idx) => (
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

export default withRouter(Games);
