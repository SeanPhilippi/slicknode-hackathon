import React from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

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

class GameItems extends React.Component {
  state = {
    isHidden: true
  };

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  render() {
    const { id, title, releaseDate, description, imgUrl, company } = this.props.single.node;
    const { isHidden } = this.state;
    const { isHome } = this.props;

    const desc = <h4>{description}</h4>;

    console.log(this.props.single);

    let buttons;
    if (isHome) {
      buttons = (
        <span>
          <button onClick={this.toggleHidden} className="btn btn-secondary text-dark mb-1">
            Game Details
          </button>
          <button className="btn btn-primary">
            Add to Collection
          </button>
        </span>
      );
    } else {
      buttons = (
        <button onClick={this.toggleHidden} className="btn btn-secondary text-dark">
          Game Details
        </button>
      );
    }

    return (
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
            {buttons}
              <GameLightbox img={imgUrl}/>
          </div>
        </div>
      </div>
    );
  }
}

export default GameItems;
