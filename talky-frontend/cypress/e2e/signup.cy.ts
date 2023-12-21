describe('registers a user', () => {

    function generateRandomEmail() {
        const uniquePart = Math.random().toString(36).substring(2, 8);
        const domain = 'example.com'; 

        return `user_${uniquePart}@${domain}`;
    }

     it('navigates to sign up page', () => {
        cy.visit('/signup');
        cy.location('pathname').should('eq', '/signup');
    });

    it('navigates to login without signup', () => {
        cy.visit('/signup');

        cy.get('[data-cy="singinBtn"]').click();

        cy.location('pathname').should('eq', '/');
    });

 
    it('fails wrong email', () => {
        cy.visit('/signup');

        cy.get('[data-cy="username"]').type('@isoo');
        cy.get('[data-cy="fullname"]').type('jane Doe');
        cy.get('[data-cy="email"]').type('janeDoe@.com');

        cy.get('[data-cy="password"]').type('12345678');

        cy.get('[data-cy="signup-submitBtn"]').click();

        cy.location('pathname').should('eq', '/signup');
    });

    it('validates username uniqueness', () => {
        const randomEmail = generateRandomEmail();
        cy.visit('/signup');

        cy.get('[data-cy="username"]').type('@isoo')
        cy.get('[data-cy="fullname"]').type('isaac Kiptoo')
        cy.get('[data-cy="email"]').type(randomEmail);

        cy.get('[data-cy="password"]').type('@Qwerty123');

        cy.get('[data-cy="signup-submitBtn"]').click();

        cy.location("pathname").should('eq', '/')

        cy.visit('/signup');
        cy.get('[data-cy="username"]').type('@isoo');
        cy.get('[data-cy="signup-submitBtn"]').click();
        cy.location("pathname").should('eq', '/signup')

        // cy.get('[data-cy="usernameError"]').should('be.visible');
    });

    // it('validates password strength', () => {
    //     const randomEmail = `user_${Math.random().toString(36).substring(2, 8)}@example.com`;

        
    //     cy.get('[data-cy="username"]').type('@isoo');
    //     cy.get('[data-cy="fullname"]').type('isaac Kiptoo');
    //     cy.get('[data-cy="email"]').type(randomEmail);

    //     // Password with less than 8 characters (should show an error)
    //     cy.get('[data-cy="password"]').type('Pass12');
    //     cy.get('[data-cy="signup-submitBtn"]').click();
    //     cy.get('[data-cy="passwordError"]').should('be.visible');

    //     // Password without a number (should show an error)
    //     cy.get('[data-cy="password"]').clear().type('Password');
    //     cy.get('[data-cy="signup-submitBtn"]').click();
    //     cy.get('[data-cy="passwordError"]').should('be.visible');
    // });

    it('passes', () => {
        const randomEmail = generateRandomEmail();
        cy.visit('/signup');

        cy.get('[data-cy="username"]').type('@isoo')
        cy.get('[data-cy="fullname"]').type('isaac Kiptoo')
        cy.get('[data-cy="email"]').type(randomEmail);

        cy.get('[data-cy="password"]').type('@Qwerty123');

        cy.get('[data-cy="signup-submitBtn"]').click();

        cy.location("pathname").should('eq', '/')

        
    });
    
});




describe('User Sign Up', () => {
    // ... (previous tests)

    

 

    // Add more tests for other edge cases and error scenarios as needed
});
