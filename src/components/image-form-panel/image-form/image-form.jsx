import classNames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as fromImages from "../../../redux/images/selectors";
import { setDescription, setTags, setTitle } from "../../../redux/images/actions";
import { setIsEditing } from "../../../redux/ui/actions";
import IconButton, { icons } from "../../common/icon-button/icon-button";
import cssClasses from "./css-classes";

import "./_styles.scss";

class ImageForm extends Component {
  static propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string,
    setDescription: PropTypes.func.isRequired,
    setTags: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setIsEditing: PropTypes.func.isRequired
  };

  onDescriptionChanged = (event) => {
    this.props.setDescription(event.target.value);
  };

  onTagsChanged = (event) => {
    this.props.setTags(event.target.value.split(","));
  };

  onTitleChanged = (event) => {
    this.props.setTitle(event.target.value);
  };

  onCloseClicked = (event) => {
    this.props.setIsEditing(false);
    event.preventDefault();
  };

  render() {
    const {
      className,
      title,
      description,
      tags
    } = this.props;
    return (
      <form className={classNames(cssClasses.root, className)}>
        <IconButton
          className={cssClasses.closeButton}
          icon={icons.CHEVRON_RIGHT}
          onClick={this.onCloseClicked}
        />
        <p className={cssClasses.fieldGroup}>
          <label
            className={cssClasses.label}
            htmlFor="image-title"
          >
            Title
          </label>
          <input
            className={cssClasses.field}
            name="image-title"
            value={title}
            onChange={this.onTitleChanged}
          />
        </p>
        <p className={cssClasses.fieldGroup}>
          <label
            className={cssClasses.label}
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className={cssClasses.field}
            name="description"
            value={description}
            onChange={this.onDescriptionChanged}
          />
        </p>
        <p className={cssClasses.fieldGroup}>
          <label
            className={cssClasses.label}
            htmlFor="tags"
          >
            Tags
          </label>
          <input
            className={cssClasses.field}
            name="tags"
            value={tags}
            onChange={this.onTagsChanged}
          />
        </p>
      </form>
    );
  }
}

const mapStateToProps = (state, { imageId }) => ({
  ...fromImages.getImage(state, imageId),
});

const mapDispatchToProps = (dispatch, { imageId }) => ({
  setDescription: (description) => dispatch(setDescription(imageId, description)),
  setTags: (tags) => dispatch(setTags(imageId, tags)),
  setTitle: (title) => dispatch(setTitle(imageId, title)),
  setIsEditing: (isEditing) => dispatch(setIsEditing(isEditing))
});


export default connect(mapStateToProps, mapDispatchToProps)(ImageForm);