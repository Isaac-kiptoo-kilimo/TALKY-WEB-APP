-- USE TALKY-APP
CREATE OR ALTER PROCEDURE createPost(
    @postID VARCHAR(255),
    @userID VARCHAR(255) ,
    @caption VARCHAR(400) ,
    @postImage VARCHAR(1000) ,
    @createdAt TIMESTAMP,
    @updatedAt TIMESTAMP

)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Posts WHERE name = @name)
    BEGIN

        INSERT INTO Posts (postID, userID,  caption,postImage)
        VALUES (@ProductID, @name, @shortDescription,@price, @image);
    END
END;