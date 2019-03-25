import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Searchbar extends Component {
  componentDidUpdate() {}

  render() {
    return (
      <React.Fragment>
        <div>aaaaaaaaaaaaaaa</div>
      </React.Fragment>
    );
  }
}
Searchbar.defaultProps = {
  url: ""
};

Searchbar.propTypes = {
  url: PropTypes.string
};

const mapStateToProps = state => ({});

export default connect(
  null,
  null
)(Searchbar);
