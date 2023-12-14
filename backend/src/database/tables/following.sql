CREATE TABLE Following (
  followingID VARCHAR(255) PRIMARY KEY,
  userID VARCHAR(255) REFERENCES Users(userID),
  followingUserID VARCHAR(255) REFERENCES Users(userID),
  createdAt TIMESTAMP
);