import React, { Component } from "react";
import { Grid, Cell } from "styled-css-grid";

class MovieListItem extends Component {
  render() {
    const styles = {
      mainCell: {},
      nameStyle: {
        "font-size": "20px",
        "font-weight": "bold",
        height: "80px",
        "border-bottom": "1px solid #ebebeb"
      },
      detailStyle: {
        "font-size": "14px"
      }
    };
    return (
      <Grid
        className="movie-item"
        style={styles.gridStyle}
        gap="0px 0px"
        columns={"2fr auto"}
        rows={"1fr 3fr auto"}
      >
        <Cell style={styles.mainCell} left={1} top={1} height={2}>
          {/* Here is the image */}
          <img src={this.props.data.image.medium} />
        </Cell>
        <Cell className="sm-hide" style={styles.nameStyle} left={2} top={1}>
          {/* Here is the name */}
          <a
            style={styles.link}
            href={this.props.data.officialSite}
            target="_blank"
          >
            {this.props.data.name}
          </a>
        </Cell>
        <Cell className="sm-hide" style={styles.detailStyle} left={2} top={2}>
          {/* Here is the details */}
          <div>
            <span>{this.props.data.runtime} min</span>
          </div>
        </Cell>
        <Cell style={styles.detailStyle} left={1} top={3}>
          {/* Here is the add to favorite button*/}
        </Cell>
        <Cell className="sm-hide" style={styles.cellStyle} left={2} top={3}>
          {/* Here is the rating */}
          <span>{this.props.data.rating.average}</span>
          <span />
        </Cell>
      </Grid>
    );
  }
}

export default MovieListItem;
