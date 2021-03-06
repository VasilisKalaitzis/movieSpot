import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMovieDetails } from "../../actions/movieActions";

import MovieListItem from "../MovieList/MovieListItem";
import MovieCast from "./MovieCast";

class MovieDetails extends Component {
  componentWillMount() {
    this.props.fetchMovieDetails(this.props.url, this.props.movieId);
  }

  renderCast() {
    return this.props.movieDetails!==undefined? <MovieCast url={this.props.url} movieId={this.props.movieId} movieCast={this.props.movieDetails._embedded.cast}/>: null;
  }
  render() {
    return (
      <React.Fragment>
        {/* Check if object is empty */}
        {Object.entries(this.props.movieDetails).length === 0 &&
        this.props.movieDetails.constructor === Object ? null : (
          <React.Fragment>
            <MovieListItem
              key={"movieView"}
              data={this.props.movieDetails}
              scope="detailed"
            />
            {this.renderCast()}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
MovieDetails.defaultProps = {
  movieId: null
};

MovieDetails.propTypes = {
  movieId: PropTypes.number
};
const mapStateToProps = state => ({
  movieDetails: state.movieReducer.movieDetails
});
export default connect(
  mapStateToProps,
  { fetchMovieDetails }
)(MovieDetails);
