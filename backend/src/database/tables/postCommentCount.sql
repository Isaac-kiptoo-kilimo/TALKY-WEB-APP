CREATE TABLE postCommentCount (
  postID VARCHAR(255) PRIMARY KEY,
  commentsCount INT DEFAULT 0,
  FOREIGN KEY (postID) REFERENCES Posts(postID)
);

DROP TABLE postCommentCount
