CREATE TABLE Followers (
  followerID VARCHAR(255) PRIMARY KEY,
  followedUserID VARCHAR(255) REFERENCES Users(userID),
  followingUserID VARCHAR(255) REFERENCES Users(userID)
);


DROP TABLE Followers

DROP TABLE Following