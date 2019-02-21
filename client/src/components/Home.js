import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import GameItems from "./GameItems";
import LoadingPage from "./LoadingPage";
import Footer from "./Footer";

const ALL_GAMES = gql`
  {
    gameList: Gamecatalog_listGame(first: 100) {
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
`;

class Home extends React.Component {
  render() {
    return (
      <div>
        <Query query={ALL_GAMES}>
          {({ loading, error, data }) => {
            if (loading) return <LoadingPage />;

            if (error) console.log(error);
            console.log(data);

            return (
              <Fragment>
                <div className="container mt-3">
                  <h1 className="display-4 text-center mb-4 ps-blue">
                    All PS3 Games
                  </h1>
                  {data &&
                    data.gameList.games.map((single, idx) => (
                      <GameItems key={idx} index={idx} single={single} isHome />
                    ))}
                </div>
                <Footer />
              </Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Home;
