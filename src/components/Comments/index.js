import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    name: '',
    comment: '',
    isLiked: false,
    currentCommentsList: [],
    totalComments: 0,
  }

  updateName = event => {
    this.setState({name: event.target.value})
  }

  updateComment = event => {
    this.setState({comment: event.target.value})
  }

  getProfileBg = () => {
    const randomIndex = Math.floor(Math.random() * 7)
    const profileBg = initialContainerBackgroundClassNames[randomIndex]
    return profileBg
  }

  addCommentDetails = event => {
    event.preventDefault()
    const {name, comment, isLiked, currentCommentsList} = this.state
    if (name === '' || comment === '') {
      return
    }
    const commentedAt = new Date()
    const profileBg = this.getProfileBg()
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked,
      profileBg,
      commentedAt,
    }

    const newCommentsList = [...currentCommentsList, newComment]
    this.setState({currentCommentsList: newCommentsList})
    this.setState(prevState => ({totalComments: prevState.totalComments + 1}))
    this.setState({name: '', comment: ''})
  }

  deleteComment = id => {
    const {currentCommentsList} = this.state
    const newCommentsList = currentCommentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({currentCommentsList: newCommentsList})
    this.setState(prevState => ({totalComments: prevState.totalComments - 1}))
  }

  likeComment = id => {
    const {currentCommentsList} = this.state
    const newCommentsList = currentCommentsList.map(eachComment => {
      if (eachComment.id === id) {
        return {...eachComment, isLiked: !eachComment.isLiked}
      }
      return {...eachComment}
    })

    this.setState({currentCommentsList: newCommentsList})
  }

  render() {
    const {name, comment, currentCommentsList, totalComments} = this.state

    return (
      <div className="bg-container">
        <div className="comments-card">
          <h1 className="title">Comments</h1>
          <div className="add-input-container">
            <form className="add-input-card" onSubmit={this.addCommentDetails}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                className="comments-img sm-device"
                alt="comments"
              />
              <p className="title-description">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={name}
                onChange={this.updateName}
              />
              <textarea
                className="name-input comment-input"
                placeholder="Your Comment"
                cols={10}
                rows={10}
                value={comment}
                onChange={this.updateComment}
              >
                {}
              </textarea>
              <button type="submit" className="submit-btn">
                Add comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="comments-img md-device"
              alt="comments"
            />
          </div>
          <div className="total-comments-container">
            <p className="comments-count">{totalComments}</p>
            <p className="comments-text">Comments</p>
          </div>
          <ul className="comments-container">
            {currentCommentsList.map(eachObj => (
              <CommentItem
                key={eachObj.id}
                commentData={eachObj}
                deleteComment={this.deleteComment}
                likeComment={this.likeComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
