import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  modifyPropertyMovie,
  fetchMovieListFromSearch
} from "../../actions/movieActions";
import { CSSTransition } from "react-transition-group";

import SearchbarFrame from "./SearchbarFrame";

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = createRef();
    this.searchInputRef = createRef();
    this.timer = null;
    this.handleClick = this.handleClick.bind(this);
    this.takeAction = this.takeAction.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.startSearch = this.startSearch.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
    clearTimeout(this.timer);
  }

  handleChange() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.startSearch, 1100);
  }

  startSearch() {
    const query = this.searchInputRef.current.value;
    this.props.fetchMovieListFromSearch(this.props.url, query);
  }

  handleClick(e) {
    const option = this.wrapperRef.current && this.wrapperRef.current.contains(e.target)
      ? { action: "modifyLayout", property: "activeFrame", value: this.props.name }
      : { action: "modifyLayout", property: "activeFrame", value: "" };
    this.takeAction(option);
  }

  takeAction(option) {
    switch (option.action) {
      case "modifyLayout":
        this.props.modifyPropertyMovie(option.property, option.value);
        break;
      default:
    }
  }

  renderFrame() {
    return (
      <CSSTransition
        in={
          this.props.activeFrame === this.props.name &&
          this.props.searchMovieList !== undefined
        }
        classNames={"slide-down"}
        unmountOnExit
        timeout={500}
      >
        <SearchbarFrame
          key={"bFrame_" + this.props.name}
          searchMovieList={this.props.searchMovieList}
        />
      </CSSTransition>
    );
  }

  render() {
    return (
      <div className="beau-container">
        <div
          className="beau-searchbar-container"
          ref={this.wrapperRef}
        >
          <div className="beau-searchbar">
            <button className="btn-search" type="button">
              {" "}
              <FontAwesomeIcon
                className="normal-fa-fonts heartUnder"
                icon="search"
              />
            </button>
            <input
              ref={this.searchInputRef}
              type="text"
              placeholder="Movies"
              onChange={this.handleChange}
            />
          </div>

          {this.renderFrame()}
        </div>
      </div>
    );
  }
}

Searchbar.defaultProps = {
  url: "",
  name: "searchbar"
};

Searchbar.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string
};

const mapStateToProps = state => ({
  searchMovieList: state.movieReducer.searchMovieList
});

export default connect(
  mapStateToProps,
  { modifyPropertyMovie, fetchMovieListFromSearch }
)(Searchbar);
