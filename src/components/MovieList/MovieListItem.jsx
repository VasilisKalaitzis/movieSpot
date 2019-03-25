import React, { Component } from "react";
import { Grid, Cell } from "styled-css-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MovieListItem extends Component {
  render() {
    const styles = {
      mainCell: {},
      nameStyle: {
        fontSize: "20px",
        fontWeight: "bold",
        height: "80px",
        borderBottom: "1px solid #ebebeb"
      },
      detailStyle: {
        fontSize: "14px"
      }
    };
    return (
      <Grid
        className="movie-item"
        style={styles.gridStyle}
        gap="0px 0px"
        columns={"1fr 1fr auto"}
        rows={"2fr 1fr 4fr auto"}
      >
        <Cell style={styles.mainCell} left={1} top={1} height={3}>
          {/* Here is the image */}
          <img src={this.props.data.image.medium} />
        </Cell>
        <Cell className="sm-hide" style={styles.nameStyle} left={3} top={1}>
          {/* Here is the name */}
          <a
            style={styles.link}
            href={this.props.data.officialSite}
            target="_blank"
          >
            {this.props.data.name}
          </a>
        </Cell>
        <Cell className="sm-hide" style={styles.detailStyle} left={3} top={2}>
          {/* Here is the duration */}
          <div>{this.props.data.runtime} min</div>
        </Cell>
        <Cell className="sm-hide" style={styles.detailStyle} left={3} top={3}>
          {/* Here are the genres */}
          {this.props.data.genres.map(genre => (
            <div key={this.props.data.id + genre}>{genre}</div>
          ))}
        </Cell>
        <Cell style={styles.detailStyle} left={1} top={4}>
          {/* Here is the add to favorite button*/}
          <div className="faContainer">
            <FontAwesomeIcon
              className="normal-fa-fonts heartUnder"
              icon="heart"
            />
            <FontAwesomeIcon
              className="normal-fa-fonts heartOver hearColor"
              icon="heart"
            />
          </div>
        </Cell>
        <Cell className="sm-hide" style={styles.cellStyle} left={3} top={4}>
          {/* Here is the rating */}

          <div className="faContainer">
            <FontAwesomeIcon className="normal-fa-fonts" icon="star" />
            <span
              className="faPercent"
              style={{ width: this.props.data.rating.average * 10 + "%" }}
            >
              <FontAwesomeIcon
                className="normal-fa-fonts starColor"
                icon="star"
              />
            </span>
          </div>
          {/* <span>{this.props.data.rating.average}</span> */}
        </Cell>
      </Grid>
    );
  }
}

export default MovieListItem;
