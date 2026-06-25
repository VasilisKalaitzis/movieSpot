import React, { Component } from "react";
import PropTypes from "prop-types";

import imageUnavailable from "../../static_images/image_not_found.png";

class MovieCast extends Component {
  renderImage(image) {
    return image === undefined || image === null ? (
      <div>
        <img
          alt="Image unavailable"
          style={{ cursor: "pointer" }}
          src={imageUnavailable}
        />
      </div>
    ) : (
      <img alt="ActorImage" style={{ cursor: "pointer" }} src={image.medium} />
    );
  }
  renderCast() {
    return (
      <div className="container">
        {this.props.movieCast.map(actor => (
          <div className="actor-container" key={actor.person.name}>
            <div>{this.renderImage(actor.person.image)}</div>
            <div className="caligraphy">{actor.person.name}</div>
          </div>
        ))}
      </div>
    );
  }
  render() {
    return (
      <React.Fragment>
        {this.props.movieCast.length === 0 ? null : this.renderCast()}
      </React.Fragment>
    );
  }
}

MovieCast.defaultProps = {
  movieId: null,
  movieCast: []
};

MovieCast.propTypes = {
  movieId: PropTypes.number,
  movieCast: PropTypes.array
};

export default MovieCast;
