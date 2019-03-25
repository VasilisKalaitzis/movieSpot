import React, { Component } from "react";
import PropTypes from "prop-types";

import MovieListItem from "../MovieList/MovieListItem";

class SearchbarFrame extends Component {
  render() {
    return (
      <div className="beau-searchbar-frame">
        {this.props.searchMovieList.map((record, i) => (
          <MovieListItem
            key={"searchMovieItem_" + i}
            data={record.show}
            scope="simple"
          />
        ))}
      </div>
    );
  }
}
SearchbarFrame.defaultProps = {
  searchMovieList: []
};

SearchbarFrame.propTypes = {
  searchMovieList: PropTypes.array
};

export default SearchbarFrame;
