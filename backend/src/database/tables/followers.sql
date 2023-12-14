CREATE TABLE Followers (
  followerID VARCHAR(255) PRIMARY KEY,
  userID VARCHAR(255) REFERENCES Users(userID),
  followerUserID VARCHAR(255) REFERENCES Users(userID)
);


DROP TABLE Followers