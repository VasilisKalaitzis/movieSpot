import React, { Component } from "react";
import { Grid, Cell } from "styled-css-grid";
import { connect } from "react-redux";
import { fetchLayoutData } from "../actions/layoutActions";

import NavBar from "./Navbar/index";
import Sidebar from "./Sidebar/index";
import MainContent from "./MainContent";
import Assistant from "./Assistant/index";

class Layout extends Component {
  componentWillMount() {
    this.props.fetchLayoutData();
  }

  retrieveValue(obj, index) {
    return obj !== undefined ? obj[index] : null;
  }
  render() {
    const styles = {
      mainGrid: {
        height: "100%"
      },
      scrollableCell: {
        height: "auto",
        "overflow-y": "auto"
      }
    };

    return (
      <Grid
        style={styles.mainGrid}
        gap="0px 0px"
        columns={"auto 1fr 1fr auto"}
        rows={"auto 1fr"}
      >
        <Cell left={1} top={1} width={4}>
          {/* Here is the navbar */}
          <NavBar key="navbar" info={this.props.layout.navbar} />
        </Cell>
        <Cell left={1} top={1}>
          {/* Here is the left bar */}
          <Sidebar
            key="sidebarLeft"
            name="sidebarLeft"
            activeTransition={this.retrieveValue(
              this.props.layout.transition_list,
              this.props.layout.transition
            )}
            activeFrame={this.props.layout.active_frame}
            info={this.props.sidebars.sidebar_left}
          />
        </Cell>
        <Cell left={4} top={1}>
          {/* Here is the right bar */}
          <Sidebar
            key="sidebarRight"
            name="sidebarRight"
            activeTransition={this.retrieveValue(
              this.props.layout.transition_list,
              this.props.layout.transition
            )}
            activeFrame={this.props.layout.active_frame}
            info={this.props.sidebars.sidebar_right}
          />
        </Cell>
        <Cell style={styles.scrollableCell} left={2} top={2} width={2}>
          {/* Here is the content */}
          <MainContent key="main_content" />
        </Cell>
        <Cell left={2} top={2}>
          <Assistant
            roaming={this.props.layout.assistant_roaming}
            visibility={this.props.layout.assistant_visibility}
          />
        </Cell>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  layout: state.layoutReducer.layout,
  sidebars: state.layoutReducer.sidebars
});

export default connect(
  mapStateToProps,
  { fetchLayoutData }
)(Layout);
