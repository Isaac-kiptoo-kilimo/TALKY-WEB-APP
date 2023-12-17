CREATE OR ALTER PROCEDURE addComment
(   @postID varchar(255) ,
	@content varchar(500) ,	
	@commentID varchar(255),
    @userID VARCHAR (255)   
)
    
AS

BEGIN
    set nocount on;

    INSERT INTO Comments (postID, content, commentID, userID)
    VALUES (@postID, @content, @commentID, @userID)
END

DROP PROCEDURE createComment