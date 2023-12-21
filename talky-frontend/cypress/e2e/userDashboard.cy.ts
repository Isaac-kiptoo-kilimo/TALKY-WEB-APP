
describe('user register', () => {


    it('navigates to login page', () => {
        cy.visit('/');
        cy.location('pathname').should('eq', '/');
    });

    it('passes', () => {
        cy.visit('/');

        cy.get('[data-cy="email"]').type('isaackilimok2@gmail.com');
        cy.get('[data-cy="password"]').type('12345678@Ik');

        cy.get('[data-cy="login_submitBtn"]').click();

        cy.get('[data-cy="general-message"]');
        cy.location('pathname').should('eq', '/user');
    });
  
});


describe('Sidebar', () => {
    beforeEach(() => {
        cy.visit('/user'); 
    });

    it('should navigate to the user page when "Home" is clicked', () => {
        cy.get('[data-cy="home"]').click();
        cy.location('pathname').should('eq', '/user');
    });

    it('should navigate to the message page when "Messages" is clicked', () => {
        cy.get('[data-cy="message"]').click();
        // cy.url().should('include', '/message');
        cy.location('pathname').should('eq', '/message');

    });

    it('should show the create post section when "Create Post" is clicked', () => {
        cy.get('[data-cy="createPost"]').click();
        cy.location('pathname').should('eq', '/createPost');
    });

    it('should navigate to the profile page when "Profile" is clicked', () => {
        cy.get('[data-cy="profileLink"]').click();
        cy.location('pathname').should('eq', '/profile');

    });

    it('should logout when "Logout" is clicked', () => {
        cy.get('[data-cy="logout"]').click();
        cy.url().should('include', '/');
    });

    it('should show search results when searching for a username', () => {
        const searchTerm = 'exampleUser';
        cy.get('input[type="search"]').type(searchTerm);
        cy.get('button[type="submit"]').click();

    });

    it('should display posts and users', () => {

        cy.get('[data-cy=postSection]').should('be.visible');
        cy.get('.user-list').should('be.visible');
    });
});


describe('User Home page', () => {
    beforeEach(() => {
        cy.visit('/user');
    });

   

    it('should like a post', () => {
        cy.get('[data-cy="postLikes"]').click();
        cy.get('[data-cy="postLikes"]').should('exist');
    });

    it('should unlike a post', () => {
        // Replace this selector with the actual selector for your unlike button
        cy.get('[data-cy="unpostLikes"]').click();
        cy.get('[data-cy="unpostLikes"]').should('exist');
    });

    it('should post a comment', () => {
        // Replace this selector with the actual selector for your comment input
        cy.get('[data-cy="update_comment_content"]').type('This is a test comment');
        cy.get('[data-cy="update_post_btn"]').click();
        cy.contains('This is a test comment').should('exist');
    });

    it('should update a comment', () => {
        // Replace this selector with the actual selector for your update comment input
        cy.get('[data-cy="commentEdit"]').click();
        cy.get('[data-cy="update_comment_content"]').clear().type('This is an updated comment');
        cy.get('[data-cy="update_post_btn"]').click();
        cy.contains('This is an updated comment').should('exist');
    });

    it('should reply to a comment', () => {
        // Replace this selector with the actual selector for your reply input
        cy.get('[data-cy="reply_comment_btn"]').type('This is a test reply');
        cy.get('[data-cy="reply_comment_btn"]').click();
        cy.contains('This is a test reply').should('exist');
    });

    it('should delete a comment', () => {
        // Replace this selector with the actual selector for your delete comment button
        cy.get('[data-cy="postComment"]').click();
        cy.get('[data-cy="commentEdit"]').click();
        cy.get('[data-cy="delete_comment_btn"]').click();
        cy.contains('This is a test comment').should('not.exist');
    });

    it('should load more comments', () => {
        // Replace this selector with the actual selector for your "more" link
        cy.get('[data-cy="loadMoreComments"]').click();
        // Add assertions based on your application behavior
    });

    // Add more tests as needed based on your application features

});



