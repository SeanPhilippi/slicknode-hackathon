import React from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import GameLightbox from "./GameLightbox";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

const ADD_GAME_TO_USER = gql`
  mutation AddGameToCollection($input: Gamecatalog_updateGameInput!) {
    Gamecatalog_updateGame(input: $input) {
      node {
        id
        title
      }
    }
  }
`;

const users = [
  {
    name: "Will",
    id: "VXNlcjo0"
  },
  {
    name: "Jake",
    id: "VXNlcjoz"
  },
  {
    name: "Sean",
    id: "VXNlcjox"
  },
  {
    name: "Zeke",
    id: "VXNlcjoy"
  }
];

class GameItems extends React.Component {
  state = {
    isHidden: true,
    dropdownOpen: false
  };

  toggleDesc = () => {
    this.setState({ isHidden: !this.state.isHidden });
  };

  toggleBtnDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    const {
      id,
      title,
      releaseDate,
      description,
      imgUrl
    } = this.props.single.node;
    const { isHidden } = this.state;
    const { isHome } = this.props;

    const desc = <p className="text-muted mt-3">{description}</p>;

    // console.log(this.props.single);

    return (
      <Mutation mutation={ADD_GAME_TO_USER}>
        {(addGameToUser, { data }) => (
          <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-8 col-lg-9">
                <h1 className="ps-blue">
                  {this.props.index + 1}: {title}
                </h1>
                <h3 className="ps-blue-light">Release Date: {releaseDate} </h3>
                {!isHidden && desc}
              </div>
              <div className="col-md-4 col-lg-3 text-center">
                {isHome ? (
                  <div>
                    <Button
                      color=""
                      className="desc-btn mb-1"
                      onClick={this.toggleDesc}
                    >
                      Game Details
                    </Button>
                    <ButtonDropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggleBtnDropdown}
                    >
                      <DropdownToggle color="" className="add-game-btn" caret>
                        Add to Collection
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Add to User:</DropdownItem>
                        {/* Chief */}
                        <DropdownItem
                          onClick={async () => {
                            await addGameToUser({
                              variables: {
                                input: {
                                  id: id,
                                  user: users[0].id
                                }
                              }
                            });

                            this.props.history.push({
                              pathname: `/games/${users[0].id}`,
                              state: { gameAdded: true, game: title }
                            });
                          }}
                        >
                          {users[0].name}
                        </DropdownItem>
                        {/* Jake */}
                        <DropdownItem
                          onClick={async () => {
                            await addGameToUser({
                              variables: {
                                input: {
                                  id: id,
                                  user: users[1].id // seans id
                                }
                              }
                            });

                            this.props.history.push({
                              pathname: `/games/${users[1].id}`,
                              state: { gameAdded: true, game: title }
                            });
                          }}
                        >
                          {users[1].name}
                        </DropdownItem>
                        {/* Sean */}
                        <DropdownItem
                          onClick={async () => {
                            await addGameToUser({
                              variables: {
                                input: {
                                  id: id,
                                  user: users[2].id
                                }
                              }
                            });

                            this.props.history.push({
                              pathname: `/games/${users[2].id}`,
                              state: { gameAdded: true, game: title }
                            });
                          }}
                        >
                          {users[2].name}
                        </DropdownItem>
                        {/* Zeke */}
                        <DropdownItem
                          onClick={async () => {
                            await addGameToUser({
                              variables: {
                                input: {
                                  id: id,
                                  user: users[3].id
                                }
                              }
                            });

                            this.props.history.push({
                              pathname: `/games/${users[3].id}`,
                              state: { gameAdded: true, game: title }
                            });
                          }}
                        >
                          {users[3].name}
                        </DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </div>
                ) : (
                  <Button
                    color=""
                    className="desc-btn mb-1"
                    onClick={this.toggleDesc}
                  >
                    Game Details
                  </Button>
                )}
                <GameLightbox img={imgUrl} />
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(GameItems);
