import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Cell } from "styled-css-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { changeMainContentView, addMovieToList } from "../../actions/movieActions";
import imageUnavailable from "../../static_images/image_not_found.png";

class MovieListItem extends Component {
  handleViewChange = (nextView, movieId) => {
    this.props.changeMainContentView(nextView, movieId);
  };

  addMovieToList = (listName, movie) => {
    this.props.addMovieToList(listName,movie);
  }

  renderImage() {
    return (
      <Cell left={1} top={2} height={3} width={2}>
        {this.props.data.image === undefined ||
        this.props.data.image === null ? (
          <div>
            <img
              alt={imageUnavailable}
              className='clickable'
              src={imageUnavailable}
              onClick={this.handleViewChange.bind(
                this,
                "movieDetails",
                this.props.data.id
              )}
            />
            <div className="na-text">{this.props.data.name}</div>
          </div>
        ) : (
          <img
            alt="MovieImage"
            className='clickable'
            src={this.props.data.image.medium}
            onClick={this.handleViewChange.bind(
              this,
              "movieDetails",
              this.props.data.id
            )}
          />
        )}
      </Cell>
    );
  }
  renderBody() {
    const styles = {
      nameStyle: {
        fontSize: "20px",
        fontWeight: "bold",
        height: "80px",
        borderBottom: "1px solid #ebebeb"
      }
    };
    return (
      <React.Fragment>
        <Cell className="sm-hide" style={styles.nameStyle} left={3} top={2}>
          {/* Here is the name */}
          <span
            className='clickable'
            href={this.props.data.officialSite}
            target="_blank"
            onClick={this.handleViewChange.bind(
              this,
              "movieDetails",
              this.props.data.id
            )}
          >
            {this.props.data.name}
          </span>
        </Cell>
        <Cell className="sm-hide" left={3} top={3}>
          {/* Here is the duration */}
          <div>{this.props.data.runtime} min</div>
        </Cell>
        <Cell className="sm-hide" left={3} top={4}>
          {/* Here are the genres */}
          {this.props.data.genres.map(genre => (
            <div key={this.props.data.id + genre}>{genre}</div>
          ))}
        </Cell>
      </React.Fragment>
    );
  }

  renderExtraDetails() {
    return (
      <React.Fragment>
        <Cell left={1} top={5} width={3}>
          {/* Here are the genres */}
          <div
            className="content-details"
            dangerouslySetInnerHTML={{
              __html: "<b>Summary: </b>" + this.props.data.summary
            }}
          />
          <div
            className="content-details"
            dangerouslySetInnerHTML={{
              __html: "<b>Status: </b>" + this.props.data.status
            }}
          />
          {/* Schedule */}
          {this.props.data.schedule !== undefined &&
          this.props.data.schedule.days.length > 0 ? (
            <div className="content-details small-fonts">
              <span>Every </span>
              <span>{this.props.data.schedule.days.join(",")} </span>
              <span> at {this.props.data.schedule.time}</span>
            </div>
          ) : null}
        </Cell>
      </React.Fragment>
    );
  }
  renderFooter() {
    return (
      <React.Fragment>
        <Cell className="faFavorite" left={1} top={6}>
          {/* Here is the add to favorite button*/}
          <div className="faContainer clickable"
            onClick={this.addMovieToList.bind(
              this,
              "favoriteMovieList",
              this.props.data
            )}
          >
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
        <Cell className="sm-hide faRating" left={3} top={6}>
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
      </React.Fragment>
    );
  }
  renderBackButton() {
    return (
      <React.Fragment>
        <Cell left={1} top={1}>
          {/* Here is the backbutton */}
          <button
            className="beau-button margin-bottom"
            onClick={this.handleViewChange.bind(this, "movieList", null)}
          >
            Back
          </button>
        </Cell>
      </React.Fragment>
    );
  }
  render() {
    return (
      <Grid
        className={"movie-item-" + this.props.scope}
        gap="0px 0px"
        columns={"1fr 1fr auto"}
        rows={"auto 2fr 1fr 4fr auto auto"}
      >
        {/* simple:  Show only Images */}
        {/* normal: Show everything except extra details */}
        {/* detailed: Show everything */}

        {this.props.scope === "detailed" ? this.renderBackButton() : null}
        {this.renderImage()}
        {this.props.scope === "normal" || this.props.scope === "detailed"
          ? this.renderBody()
          : null}
        {this.props.scope === "detailed" ? this.renderExtraDetails() : null}
        {this.props.scope === "normal" || this.props.scope === "detailed"
          ? this.renderFooter()
          : null}
      </Grid>
    );
  }
}

MovieListItem.defaultProps = {
  data: {
    genres: [],
    rating: {}
  }
};

MovieListItem.propTypes = {
  data: PropTypes.object
};

export default connect(
  null,
  { changeMainContentView, addMovieToList }
)(MovieListItem);
