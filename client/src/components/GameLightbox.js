import React from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class GameLightbox extends React.Component {
  state = {
    photoIndex: 0,
    isOpen: false
  };

  render() {
    const { isOpen } = this.state;
    const { img } = this.props;

    return (
      <div>
        <img
          src={img}
          width={"100px"}
          style={{ marginTop: 15 }}
          type="button"
          alt="video game"
          onClick={() => this.setState({ isOpen: true })}
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

export default GameLightbox;
