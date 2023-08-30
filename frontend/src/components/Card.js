import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default class Card extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleCardLike = this.handleCardLike.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  get isOwner() {
    return this.props.card.owner._id === this.context._id
  }

  get isLiked() {
    return this.props.card.likes.some(i => i._id === this.context._id);
  }

  get likeButtonClassName() {
    return `element__button ${this.isLiked ? 'element__button_active' : ''}`
  }

  handleClick() {
    this.props.onCardClick(this.props.card);
  }

  handleCardLike(event) {
    event.stopPropagation();
    this.props.onCardLike(this.props.card);
  }

  handleDeleteClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onCardDelete(this.props.card);
  }

  render() {
    return (
      <article className="element" onClick={this.handleClick}>
        <div className="element__image-button">
          <img src={this.props.card.link} alt={this.props.card.name} className="element__image"/>
          {this.isOwner && <button className="element__trash-button" onClick={this.handleDeleteClick}/>}
        </div>
        <div className="element__area">
          <h2 className="element__title">{this.props.card.name}</h2>
          <div className="element__group">
            <button className={this.likeButtonClassName}
                    type="button"
                    onClick={this.handleCardLike}
            />
            <h3 className="element__text">
              {this.props.card.likes.length}
            </h3>
          </div>
        </div>
      </article>
    );
  }
}
