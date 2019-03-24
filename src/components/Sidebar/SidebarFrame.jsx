import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { modifyLayout } from "../../actions/layoutActions";

import "../../css/Sidebar.css";

class SidebarFrame extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.takeAction = this.takeAction.bind(this);
  }
  componentDidMount() {
    //Handle clicks outside of the sidebar
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    //Handle clicks outside of the sidebar
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClick = e => {
    if (this.setWrapperRef.contains(e.target)) {
      //click inside of component, do nothing
      return;
    }
    let option = {
      action: "modifyLayout",
      property: "active_frame",
      value: ""
    };
    this.takeAction(option);
  };

  takeAction(option) {
    switch (option.action) {
      case "modifyLayout":
        this.props.modifyLayout(option.property, option.value);
        break;
      default:
    }
  }
  render() {
    // const styles = {};

    return (
      <div
        className={
          "sidebar-frame sidebar-frame-" +
          this.props.position +
          " " +
          this.props.colorPallete
        }
        ref={el => (this.setWrapperRef = el)}
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
