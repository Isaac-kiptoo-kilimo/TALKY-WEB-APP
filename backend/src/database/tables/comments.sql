
CREATE TABLE Comments (
    commentID VARCHAR(255) PRIMARY KEY,
    content VARCHAR(500),
    userID VARCHAR(255),
    postMediaID VARCHAR(255),
    postID VARCHAR (255),
    isDeleted BIT DEFAULT 0,
    likesCount INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (postMediaID) REFERENCES postMedia(postMediaID),
    FOREIGN KEY (postID) REFERENCES Posts(postID)
);
ALTER TABLE Comments
ADD likesCount INT DEFAULT 0;


SELECT * FROM Comments;
DROP TABLE Comments;


-- ON UPDATE CASCADE;