import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import imageAnavailable from "../../static_images/image_not_found.png";

class MovieDetails extends Component {
  renderImage(image) {
    return image === undefined || image === null ? (
      <div>
        <img
          alt={imageAnavailable}
          style={{ cursor: "pointer" }}
          src={imageAnavailable}
        />
        <div className="na-text">{this.props.data.name}</div>
      </div>
    ) : (
      <img alt="ActorImage" style={{ cursor: "pointer" }} src={image.medium} />
    );
  }
  renderCast() {
    return (
      <div className="container">
        {this.props.movieCast.map(actor => (
          <div className="actor-container" key="actor.person.name">
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
        {/* Check if object is empty */}
        {Object.entries(this.props.movieCast).length === 0 &&
        this.props.movieCast.constructor === Object
          ? null
          : this.renderCast()}
      </React.Fragment>
    );
  }
}
MovieDetails.defaultProps = {
  movieId: null,
  movieCast: {}
};

MovieDetails.propTypes = {
  movieId: PropTypes.number,
  movieCast: PropTypes.array
};
export default MovieDetails;
