CREATE OR ALTER PROCEDURE updateComment
	(
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
	
	WHERE userID = @userID AND commentID = @commentID;
END;