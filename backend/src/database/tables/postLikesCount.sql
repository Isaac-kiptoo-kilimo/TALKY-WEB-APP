CREATE TABLE postLikeCount (
  postLIkeCountID VARCHAR(255) PRIMARY KEY,
  likesCount INT DEFAULT 0,
  postID VARCHAR(255) REFERENCES Posts(postID),
);
DROP TABLE postLikeCount


SELECT * FROM postLikeCount