import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { modifyLayout } from "../../actions/layoutActions";

import "../../css/Sidebar.css";

class SidebarFrame extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = createRef();
    this.handleClick = this.handleClick.bind(this);
    this.takeAction = this.takeAction.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick(e) {
    if (this.wrapperRef.current && this.wrapperRef.current.contains(e.target)) {
      return;
    }
    this.takeAction({
      action: "modifyLayout",
      property: "activeFrame",
      value: ""
    });
  }

  takeAction(option) {
    switch (option.action) {
      case "modifyLayout":
        this.props.modifyLayout(option.property, option.value);
        break;
      default:
    }
  }

  render() {
    return (
      <div
        className={
          "sidebar-frame sidebar-frame-" +
          this.props.position +
          " " +
          this.props.colorPallete
        }
        ref={this.wrapperRef}
      >
        <div className="sidebar-frame-header" />
        <div className="sidebar-frame-content">
          <ul>
            {this.props.options.map(option => (
              <li
                key={"sfButton_" + option.name}
                className="underline-transition"
                onClick={e => this.takeAction(option, e)}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

SidebarFrame.defaultProps = {
  options: []
};

SidebarFrame.propTypes = {
  options: PropTypes.array,
  position: PropTypes.string
};

export default connect(
  null,
  { modifyLayout }
)(SidebarFrame);
