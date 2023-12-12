CREATE TABLE commentLikes (
  likeID VARCHAR(255) PRIMARY KEY,
  userID VARCHAR(255) REFERENCES Users(userID),
  commentID VARCHAR(255) REFERENCES Comments(commentID),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
