CREATE TABLE postMedia (
    postMediaID VARCHAR(255),
    postID VARCHAR(255) ,
    mediaFile VARCHAR(500) ,
    createdAt TIMESTAMP

     FOREIGN KEY (postID) REFERENCES Posts(postID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS postMedia;

select * from postMedia