CREATE TABLE Posts (
    postID VARCHAR(255) PRIMARY KEY,
    userID VARCHAR(255) REFERENCES Users(userID),
    caption VARCHAR(400) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE()
    );

DROP TABLE Posts;
-- ALTER TABLE Posts
-- DROP COLUMN createdAt;

ALTER TABLE Posts
ADD createdAt VARCHAR(300);

select * from Posts

-- 0712781681