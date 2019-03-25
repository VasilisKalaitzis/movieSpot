import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMainContentData } from "../actions/movieActions";

import MovieList from "./MovieList/index";
import MovieDetails from "./MovieDetails/index";
import Searchbar from "./Searchbar/index";
import "../css/MainContent.css";

class MainContent extends Component {
  componentWillMount() {
    this.props.fetchMainContentData();
  }

  renderMovieList() {
    return (
      <MovieList
        url={this.props.mainContent.data_url}
        currentPage={this.props.currentPage}
        itemPerPage="25"
      />
    );
  }
  renderMovieDetails() {
    return (
      <MovieDetails
        url={this.props.mainContent.data_url}
        movieId={this.props.movieId}
      />
    );
  }
  renderSearchbar() {
    return <Searchbar url={this.props.mainContent.search_url} />;
  }
  render() {
    return (
      <div className="container">
        {/* View for Movies */}

        {this.props.mainContent.current_view === "movieList"
          ? this.renderSearchbar()
          : null}

        {this.props.mainContent.current_view === "movieList"
          ? this.renderMovieList()
          : null}

        {/* View for Favorites */}
        {/* <div className="moviesList">
          <div className="flexcontrainer-fill">
            <div>movie1</div>
            <div>movie2</div>
          </div>
        </div> */}

        {this.props.mainContent.current_view === "movieDetails"
          ? this.renderMovieDetails()
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mainContent: state.movieReducer.mainContent,
  movieId: state.movieReducer.movieId
});

export default connect(
  mapStateToProps,
  { fetchMainContentData }
)(MainContent);
