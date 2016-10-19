import React from 'react';
import './CommentBox.css';

var Comment = React.createClass({
  render: function () {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({

  getInitialState: function() {
    return {author: '', text: ''};
  },

  handleAuthorChange: function(event) {
    this.setState({author: event.target.value});
  },

  handleTextChange: function(event) {
    this.setState({text: event.target.value});
  },

  handleSubmit: function(event) {
    event.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();

    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },

  render: function () {
    return (
      <div className="commentForm">
        <h4>create a new comment:</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={this.state.author}
            onChange={this.handleAuthorChange}
          />
          <input
            type="text"
            placeholder="Say something..."
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
});


var CommentBox = React.createClass({

  loadCommentsFromServer: function () {
    let commentBox = this;

    fetch(commentBox.props.url)
      .then(response => {
        response.json()
          .then(json => {
            commentBox.setState({
              data: json
            });
          })
          .catch(err => {
            commentBox.printError(err)
          });
      })
      .catch(err => {
        commentBox.printError(err)
      });
  },

  handleCommentSubmit: function(comment) {
    let comments = this.state.data;

    comment.id = Date.now();
    let newComments = comments.concat([comment]);
    this.setState({data: newComments});


    //todo: save data to server
  },

  getInitialState: function () {
    return {data: []};
  },

  printError: function (err) {
    console.error(err);
  },

  componentDidMount: function () {
    this.loadCommentsFromServer();
    // setInterval(
    //   this.loadCommentsFromServer,
    //   this.props.pollInterval
    // );
  },

  render: function () {
    return (
      <div className="commentBox">
        <h2>Comments</h2>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

export default CommentBox;
