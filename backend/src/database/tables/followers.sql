-- CREATE TABLE Followers (
--   followerID VARCHAR(255) PRIMARY KEY,
--   followedUserID VARCHAR(255) REFERENCES Users(userID),
--   followingUserID VARCHAR(255) REFERENCES Users(userID)
-- );

CREATE TABLE Followers (
    followedUserID VARCHAR(255),
    followingUserID VARCHAR(255),
    isFollowing BIT DEFAULT 0, 
    PRIMARY KEY (followedUserID, followingUserID),
    FOREIGN KEY (followedUserID) REFERENCES Users(userID),
    FOREIGN KEY (followingUserID) REFERENCES Users(userID)
);

DROP TABLE Followers

DROP TABLE Following

SELECT * FROM Followers