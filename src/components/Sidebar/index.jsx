import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SidebarFrame from "./SidebarFrame";
import { modifyLayout } from "../../actions/layoutActions";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Sidebar extends Component {
  changeActiveFrame(frameName = "") {
    // This function change the active frame of the Layout state
    //if not parameter is given, all frames will close
    this.props.modifyLayout("active_frame", frameName);
  }

  renderFrame() {
    // Create the sidebarFrame only if it is active
    return (
      <CSSTransition
        in={this.props.activeFrame === this.props.name}
        classNames={
          "slide-" + this.props.activeTransition + this.props.info.position
        }
        unmountOnExit
        timeout={500}
      >
        <SidebarFrame
          key={"sFrame_" + this.props.name}
          options={this.props.info.options}
          position={this.props.info.position}
          colorPallete={this.props.info.colorPallete}
          onBlur={this.changeActiveFrame}
        />
      </CSSTransition>
    );
  }
  render() {
    // const styles = {};

    return (
      <div className={this.props.info.colorPallete + " transparent-background"}>
        <div
          className="sidebar-button"
          onClick={this.changeActiveFrame.bind(this, this.props.name)}
        >
          <FontAwesomeIcon
            className="normal-fa-fonts"
            icon={this.props.info.icon}
          />
          {/* <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={"svg-inline--fa fa-w-16 fa-6x"}
          >
            <path fill="currentColor" d={this.props.info.svg_d} className="" />
          </svg> */}
        </div>
        {this.renderFrame()}
      </div>
    );
  }
}

Sidebar.defaultProps = {
  info: {}
};

Sidebar.propTypes = {
  info: PropTypes.object
};

export default connect(
  null,
  { modifyLayout }
)(Sidebar);
