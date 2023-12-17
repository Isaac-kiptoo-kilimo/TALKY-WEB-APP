CREATE OR ALTER PROCEDURE updateComment
	(
    @postID VARCHAR(255),
    @userID VARCHAR (255),
    @content VARCHAR(500),
    @commentID VARCHAR(255)
	)
as

SET NOCOUNT ON;

BEGIN
	UPDATE Comments
	SET 
      content = @content
	
	WHERE postID= @postID AND userID = @userID AND commentID = @commentID;
END;