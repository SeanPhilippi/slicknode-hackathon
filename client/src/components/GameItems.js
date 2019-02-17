import React from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class GameLightbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render() {
    const { isOpen } = this.state;
    const { img } = this.props;
    // const { imgUrl } = this.props.single.node;

    return (
      <div>
        <img 
          src={img} 
          width={'100px'} 
          style={{ marginTop: 15 }} 
          type="button" onClick={() => this.setState({ isOpen: true })}
        />
        {isOpen && (
          <Lightbox
            mainSrc={img}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}


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

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  toggleBtn = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    const { id, title, releaseDate, description, imgUrl, company } = this.props.single.node;
    const { isHidden } = this.state;
    const { isHome } = this.props;

    const desc = <h4>{description}</h4>;

    // console.log(this.props.single);

    return (
      <Mutation mutation={ADD_GAME_TO_USER}>
        {(addGameToUser, { data }) => (
          <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-10">
                <h1>
                  {this.props.index + 1}: {title}
                </h1>
                <h3>Release Date: {releaseDate} </h3>
                {!isHidden && desc}
              </div>
              <div className="col-md-2 text-center">
                { isHome ?
                  (
                    <span>
                      <button onClick={this.toggleHidden} className="btn btn-secondary text-dark mb-1">
                        Game Details
                      </button>
                      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleBtn}>
                        <DropdownToggle color="primary" caret>
                          Add to Collection
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>To User:</DropdownItem>
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
                      <button onClick={this.toggleHidden} className="btn btn-secondary text-dark">
                        Game Details
                      </button>
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
