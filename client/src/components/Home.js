import React, {Fragment} from 'react';
// import PropTypes from 'prop-types';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import GameItems from "./GameItems";

const ALL_GAMES = gql`
    {
        games: Gamecatalog_listGame(first: 100) {
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
`;

class Home extends React.Component {
  render() {
    return (
      <div>
        <Query query={ALL_GAMES}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            console.log(data);
            return (
              <Fragment>
                <h1 className='text-center mb-3'>ALL PS3 GAMES</h1>
                {data.games.edges.map((single, idx) => (
                  <GameItems key={idx} index={idx} single={single} isHome />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Home;