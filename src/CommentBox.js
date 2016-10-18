import React, { Component } from 'react';

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h2>Comments</h2>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

export default CommentBox;
