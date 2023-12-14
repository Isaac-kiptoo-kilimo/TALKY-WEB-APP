-- USE TALKY-APP
CREATE OR ALTER PROCEDURE createPost(
    @postID VARCHAR(255),
    @userID VARCHAR(255) ,
    @caption VARCHAR(400)    
)
AS
    BEGIN

        INSERT INTO Posts (postID, userID,  caption)
        VALUES (@postID, @userID, @caption);
 
END;
