import React, { Component } from "react";
import PropTypes from "prop-types";

class Layout extends Component {
  renderOption = option => {
    switch (option.action) {
      case "openLink":
        return (
          <div
            className="flexcontrainer-block"
            key={"navbar_button_" + option.name}
          >
            <a href={option.value} target={option.target}>
              {option.text}
            </a>
          </div>
        );
      default:
        return null;
    }
  };
  render() {
    // const styles = {};

    return (
      <div className="navbar gradient-background">
        <div className="flexcontrainer-fit gradient-text">
          {this.props.info.options === undefined
            ? null
            : this.props.info.options.map((option, i) =>
                this.renderOption(option)
              )}
        </div>
      </div>
    );
  }
}
Layout.defaultProps = {
  info: {}
};

Layout.propTypes = {
  info: PropTypes.object
};

export default Layout;
