
CREATE OR ALTER PROCEDURE getAllUsers

  @loggedInUserID VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE role != 'Admin'
        AND userID != @loggedInUserID;
END; 

GO
CREATE OR ALTER PROCEDURE getAllUsersAvailable

AS
BEGIN
    SELECT *
    FROM Users
    WHERE role != 'Admin'
        
END; 

