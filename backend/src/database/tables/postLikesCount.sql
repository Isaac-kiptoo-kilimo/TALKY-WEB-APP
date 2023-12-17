CREATE TABLE postLikeCount (
  postID VARCHAR(255) PRIMARY KEY,
  likesCount INT DEFAULT 0,
  FOREIGN KEY (postID) REFERENCES posts(postID)
);
DROP TABLE postLikeCount