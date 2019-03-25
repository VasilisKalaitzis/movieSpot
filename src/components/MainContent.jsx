import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMainContentData } from "../actions/movieActions";

import MovieList from "./MovieList/index";
import "../css/MainContent.css";

class MainContent extends Component {
  componentWillMount() {
    this.props.fetchMainContentData();
  }

  renderMovieList() {
    return <MovieList url={this.props.mainContent.data_url} itemPerPage="25" />;
  }

  render() {
    // const styles = {};
    console.log("props!! = " + JSON.stringify(this.props));
    return (
      <React.Fragment>
        {/* View for Movies */}

        {this.props.mainContent.current_view === "MovieList"
          ? this.renderMovieList()
          : null}

        {/* View for Favorites */}
        {/* <div className="moviesList">
          <div className="flexcontrainer-fill">
            <div>movie1</div>
            <div>movie2</div>
          </div>
        </div> */}

        {/* View for Single Movie  */}
        {/* <div className="movie">
          <div className="flexcontrainer-fill">
            <div>movie1</div>
            <div>movie2</div>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mainContent: state.movieReducer.mainContent
});

export default connect(
  mapStateToProps,
  { fetchMainContentData }
)(MainContent);
