import React from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import GameLightbox from './GameLightbox';

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


class GameItems extends React.Component {
  state = {
    isHidden: true,
    dropdownOpen: false
  };

  toggleDesc = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  toggleBtnDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    const { id, title, releaseDate, description, imgUrl } = this.props.single.node;
    const { isHidden } = this.state;
    const { isHome } = this.props;

    const desc = <p className="text-muted mt-3">{description}</p>;

    // console.log(this.props.single);

    return (
      <Mutation mutation={ADD_GAME_TO_USER}>
        {(addGameToUser, { data }) => (
          <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-8 col-lg-9 col-xl-10">
                <h1 className="ps-blue">
                  {this.props.index + 1}: {title}
                </h1>
                <h3 className="ps-blue-light">Release Date: {releaseDate} </h3>
                {!isHidden && desc}
              </div>
              <div className="col-md-4 col-lg-3 col-xl-2 text-center">
                { isHome ?
                  (
                    <span>
                      <Button color="" className="desc-btn mb-1" onClick={this.toggleDesc}>
                        Game Details
                      </Button>
                      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleBtnDropdown}>
                        <DropdownToggle color="" className='add-game-btn' caret>
                          Add to Collection
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>Add to User:</DropdownItem>
                          <DropdownItem onClick={() => {
                            addGameToUser({
                              variables: {
                                input: {
                                  id: id,
                                  user: 'VXNlcjox'
                                }
                              }
                            });
                          }}>Sean</DropdownItem>
                          <DropdownItem onClick={() => {
                            addGameToUser({
                              variables: {
                                input: {
                                  id: id,
                                  user: 'VXNlcjoy'
                                }
                              }
                            });
                          }}>Zeke</DropdownItem>
                          <DropdownItem onClick={() => {
                            addGameToUser({
                              variables: {
                                input: {
                                  id: id,
                                  user: 'VXNlcjoz'
                                }
                              }
                            });
                          }}>Jake</DropdownItem>
                          <DropdownItem onClick={() => {
                            addGameToUser({
                              variables: {
                                input: {
                                  id: id,
                                  user: 'VXNlcjoz'
                                }
                              }
                            });
                          }}>Will</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </span>
                  ) :
                    (
                      <Button color="" className="desc-btn mb-1" onClick={this.toggleDesc}>
                        Game Details
                      </Button>
                    )
                }
                <GameLightbox img={imgUrl}/>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default GameItems;
