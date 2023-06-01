// Write your code here
import React from 'react'
import './index.css'

class CommentItem extends React.Component {
  toggleLikeButton = () => {
    const { toggleLike, commentList } = this.props
    const { id } = commentList
    toggleLike(id)
  }

  deleteComment = () => {
    const { deleteCommentItem, commentList } = this.props
    const { id } = commentList
    deleteCommentItem(id)
  }


  updateCommentedTime = (commentAddedDate) => {
    const date = new Date(commentAddedDate)
    const currentDate = new Date()

    const commntedsecondsData = date.getSeconds()
    const commentedMinuteData = date.getMinutes()
    const commentedHoursData = date.getHours()
    const commentedMonthData = date.getMonth()
    const commentedDaysData = date.getDay()
    const commntedYearsData = date.getFullYear()

    const currentSeconds = currentDate.getSeconds()
    const currentMinute = currentDate.getMinutes()
    const currentHour = currentDate.getHours()
    const currentDay = currentDate.getDay()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()


    let result = ""
    if (currentYear <= commntedYearsData) {
      if (currentMonth <= commentedMonthData) {
        if (currentDay <= commentedDaysData) {
          if (currentHour <= commentedHoursData) {
            if (currentMinute <= commentedMinuteData) {
              result = `${currentSeconds - commntedsecondsData} seconds ago`
            }
            else {
              result = `${currentMinute - commentedMinuteData} minutes ago`
            }
          }
          else {
            result = `${currentHour - commentedHoursData} hours ago`
          }
        }
        else {
          result = `${currentDay - commentedDaysData} days ago`
        }
      }
      else {
        result = `${currentMonth - commentedMonthData} month ago`
      }
    }
    else {
      result = `${currentYear - commntedYearsData} years ago`
    }

    return result
  }

  render() {
    const { commentList } = this.props
    const { userName, userComment, isLiked, userLogoBgColor, commentAddedDate } = commentList
    const likeImgUrl = isLiked
      ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

    const commentedTime = this.updateCommentedTime(commentAddedDate)

    return (
      <li className="item">
        <div className="user-comment-info">
          <div className={`user-logo ${userLogoBgColor}`}>
            <h1>{userName.split(' ')[0][0]}</h1>
          </div>
          <div>
            <div className='name-date-container' >
              <h1 className="user-name">{userName}</h1>
              <p>{commentedTime}</p>
            </div>
            <p className="user-comment">{userComment}</p>
          </div>
        </div>

        <div className="btn-container">
          <div className="like-btn-container">
            <button
              type="button"
              className="like-btn"
              onClick={this.toggleLikeButton}
            >
              <img
                src={likeImgUrl}
                alt=""
                className={`like-img ${isLiked ? 'like-active' : ''}`}
              />
              <p className={`like ${isLiked ? 'like-active' : ''}`}>Like</p>
            </button>
          </div>
          <div className="delete-btn-container">
            <button className="delete-btn" type="button" onClick={this.deleteComment} >
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
                alt="delete"
              />
            </button>
          </div>
        </div>
      </li>
    )
  }
}

export default CommentItem
