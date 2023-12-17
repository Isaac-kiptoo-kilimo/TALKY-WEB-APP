CREATE TABLE postMedia (
    postMediaID VARCHAR(255) PRIMARY KEY,
    postID VARCHAR(255) ,
    mediaFile VARCHAR(500) ,
    createdAt DATETIME DEFAULT GETDATE()

    FOREIGN KEY (postID) REFERENCES Posts(postID) ON DELETE CASCADE
);


DROP TABLE IF EXISTS postMedia;

select * from postMedia