import React, { Component } from "react";
import { TimelineMax } from "gsap/TweenMax";
import PropTypes from "prop-types";
import { Grid, Cell } from "styled-css-grid";

import "../../css/Assistant.css";

class Assistant extends Component {
  constructor(props) {
    super(props);
    // reference to the DOM node
    this.wingsTimeline = null;
    // reference to the animation
    this.wingsTimeline = null;
  }

  componentDidMount() {
    //Initializing movement
    this.cubicMovement();
    this.wingsMovement();
  }

  render() {
    const styles = {
      cubicContainerStyle: {
        display: this.props.visibility ? "block" : "none"
      },
      cubicStyle: {
        top: "0",
        left: "0"
      }
    };

    return (
      <div
        className="cubic-container"
        ref={c => (this.cubicContainer = c)}
        style={styles.cubicContainerStyle}
      >
        <div
          className="cubic"
          ref={c => (this.cubic = c)}
          style={styles.ncubicStyle}
          click="giveFeedback"
        >
          <Grid
            gap="0px 0px"
            columns={"1fr 1fr 1fr 3fr"}
            rows={"8fr 1fr 1fr 1fr 1fr"}
          >
            <Cell left={1} top={1} width={4} height={1}>
              {/* <BubbleChat msg={this.props.msg} /> */}
            </Cell>
            <Cell left={2} top={3} height={3}>
              <div className="cubic-body" />
            </Cell>
            <Cell left={1} top={2}>
              <div
                className="cubic-left-wing"
                ref={c => (this.cubicWing1 = c)}
              />
            </Cell>
            <Cell left={3} top={2}>
              <div
                className="cubic-right-wing"
                ref={c => (this.cubicWing2 = c)}
              />
            </Cell>
          </Grid>
        </div>
      </div>
    );
  }

  cubicMovement() {
    const { cubicContainer, cubic } = this;

    this.cubicTimeline = new TimelineMax({
      onComplete: () => this.cubicMovement()
    });

    this.cubicTimeline.to(cubic, 2, {
      top: this.randomHeight(cubicContainer),
      left: this.randomWidth(cubicContainer),
      ease: "Back.easeOut"
    });
  }
  wingsMovement() {
    const { cubicWing1, cubicWing2 } = this;
    this.wingsTimeline = new TimelineMax({
      onComplete: () => this.wingsTimeline.restart()
    });
    this.wingsTimeline.to([cubicWing1], 1, {
      skewY: 10,
      ease: "Elastic.easeOut"
    });
    this.wingsTimeline.to([cubicWing2], 1, {
      skewY: -10,
      ease: "Elastic.easeOut"
    });
  }

  randomHeight(container) {
    var height = container.offsetHeight;
    var randomHeight = Math.floor(Math.random() * (height - 80));
    return randomHeight;
  }
  randomWidth(container) {
    var width = container.offsetWidth;
    var randomWidth = Math.floor(Math.random() * (width - 80));
    return randomWidth;
  }
}

Assistant.defaultProps = {
  info: {}
};

Assistant.propTypes = {
  info: PropTypes.object
};
export default Assistant;
