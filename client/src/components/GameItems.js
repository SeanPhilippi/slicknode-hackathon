import React from "react";
//var Linkify = require("react-linkify");

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
    const { id, title, date, description, url } = this.props.single;
    const { isHidden } = this.state;

    const desc = <h4>{description}</h4>;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-9">
            <h1>
              {id}: {title}
            </h1>
            <h3>Release Date: {date} </h3>
            {!isHidden && desc}
            <p>{url}</p>
          </div>
          <div className="col-md-3">
            <button onClick={this.toggleHidden} className="btn btn-secondary">
              Game Details
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GameItems;
