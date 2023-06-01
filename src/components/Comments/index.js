import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import './index.css'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends React.Component {


  state = { addName: '', addComment: '', commentsList: localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : [] }

  setName = event => this.setState({ addName: event.target.value })

  AddComment = event => this.setState({ addComment: event.target.value })

  toggleLike = uniqId => {
    this.setState(prevState => {
      const updateCommentLikes = prevState.commentsList.map(obj => {
        if (obj.id === uniqId) {
          return { ...obj, isLiked: !obj.isLiked }
        }
        return obj
      })
      return { commentsList: updateCommentLikes }
    })
  }

  deleteCommentItem = (uniqId) => {

    this.setState(prevState => {
      const updatedCommentsList = prevState.commentsList.filter(obj => obj.id !== uniqId)
      console.log("updatecomments", updatedCommentsList)
      return { commentsList: updatedCommentsList }
    })
    console.log(this.state, "comemntslist")
  }

  submit = event => {
    event.preventDefault()
    const { addName, addComment } = this.state
    if (addName !== "" && addComment !== "") {
      const backgroundColor =
        initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
        ]

      const userCommentObject = {
        userName: addName,
        userComment: addComment,
        isLiked: false,
        id: uuidv4(),
        userLogoBgColor: backgroundColor,
        commentAddedDate:new Date()
      }

      this.setState(prevState => {
        const updatedCommentsList = [...prevState.commentsList, userCommentObject]
        return { commentsList: updatedCommentsList }
      })

    }

    this.setState({ addName: "", addComment: "" })

  }

  render() {
    const { name, comment, commentsList } = this.state
    const noOfComments = commentsList.length
    localStorage.setItem("comments", JSON.stringify(commentsList))
    console.log(commentsList)

    const storedComments = [...commentsList]


    return (
      <div className="container">
        <div className='comment-container' >
          <div className="heading-content">
            <h1>Comments</h1>
          </div>
          <div className="form-container">
            <div className="comment-form-container">
              <p>Say something about</p>
              <form onSubmit={this.submit}>
                <div className="form">
                  <input
                    className="add-name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={this.setName}
                  />
                  <textarea
                    className="add-comment"
                    placeholder="Your Comments"
                    value={comment}
                    onChange={this.AddComment}
                  />
                  <button className="button" type="submit">
                    Add Comment
                  </button>
                </div>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="be comments"
              />
            </div>
        </div>

        </div>
        <div className="comments-section">
          <div className="noOfCommentsContainer">
            <p>
              <span className="noOfCommentsCount ">{noOfComments}</span>
              Comments
            </p>
          </div>
          <ul className="display-comments-container">
            {storedComments.map(obj => (
              <CommentItem
                key={obj.id}
                commentList={obj}
                toggleLike={this.toggleLike}
                deleteCommentItem={this.deleteCommentItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
