-- USE TALKY_APP
CREATE TABLE Replies (
  replyID VARCHAR(255) PRIMARY KEY,
  userID VARCHAR(255) REFERENCES Users(userID),
  commentID VARCHAR(255) REFERENCES Comments(commentID),
  text VARCHAR(500) NOT NULL ,
  isDeleted BIT DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
);

DROP TABLE Replies

select * from Replies