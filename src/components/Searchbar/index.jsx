import React, { Component } from "react";
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
  // ToDo: as I'm writting code, I notice that the functions bellow
  // are us over and over again, I should defenitely assign them to
  // a global helper file
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.takeAction = this.takeAction.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.startSearch = this.startSearch.bind(this);
  }
  componentWillMount() {
    // Time to handle change of input
    this.timer = null;
  }
  componentDidMount() {
    //Handle clicks outside of the sidebar
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    //Handle clicks outside of the sidebar
    document.removeEventListener("mousedown", this.handleClick, false);
    clearTimeout(this.timer);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleChange() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.startSearch, 1100);
  }
  startSearch() {
    let query = this.refs.searchInput.value;
    this.props.fetchMovieListFromSearch(this.props.url, query);
  }

  handleClick = e => {
    let option;
    if (this.setWrapperRef.contains(e.target)) {
      //click inside of component, do nothing
      option = {
        action: "modifyLayout",
        property: "activeFrame",
        value: this.props.name
      };
    } else {
      // click outside of component, update state in order to hide the frame
      option = {
        action: "modifyLayout",
        property: "activeFrame",
        value: ""
      };
    }

    this.takeAction(option);
  };

  takeAction(option) {
    switch (option.action) {
      case "modifyLayout":
        this.props.modifyPropertyMovie(option.property, option.value);
        break;
      default:
    }
  }

  renderFrame() {
    // Create the sidebarFrame only if it is active
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
          ref={el => (this.setWrapperRef = el)}
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
              ref="searchInput"
              type="text"
              placeholder="Movies"
              onChange={e => this.handleChange(e)}
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
