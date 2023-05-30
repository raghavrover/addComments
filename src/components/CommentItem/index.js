import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentData, deleteComment, likeComment} = props
  const {name, comment, id, isLiked, commentedAt, profileBg} = commentData
  const profileName = name[0].toUpperCase()
  const distanceTime = formatDistanceToNow(commentedAt, {
    includeSeconds: true,
    addSuffix: true,
  })
  const likeImgObj = isLiked
    ? {
        likeImg:
          'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png',
        likeClass: 'liked',
      }
    : {
        likeImg:
          'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png',
        likeClass: '',
      }
  const {likeImg, likedClass} = likeImgObj
  const removeComment = () => {
    deleteComment(id)
  }

  const likeTheComment = () => {
    likeComment(id)
  }

  return (
    <li className="comment-card">
      <div className="comment-content-card">
        <h1 className={`profile-name ${profileBg}`}>{profileName}</h1>
        <div className="comment-content-container">
          <div className="commenter-name-time-container">
            <h1 className="commenter-name">{name}</h1>
            <p className="commented-at">{distanceTime}</p>
          </div>
          <p className="comment-content">{comment}</p>
        </div>
      </div>
      <div className="like-and-delete-container">
        <div className="like-btn-container">
          <button className="like-btn" type="button" onClick={likeTheComment}>
            <img src={likeImg} className="like-img " alt="like" />
          </button>
          <p className={`like-text ${likedClass}`}>Like</p>
        </div>
        <button
          className="like-btn"
          data-testid="delete"
          type="button"
          onClick={removeComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="like-img"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
