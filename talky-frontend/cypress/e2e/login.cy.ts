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

    it('fails', () => {
        cy.visit('/');

        cy.get('[data-cy="email"]').type('caleb.kellah@thejitu.com');
        cy.get('[data-cy="password"]').type('1234466e');

        cy.get('[data-cy="login_submitBtn"]').click();
        cy.location('pathname').should('eq', '/');
        cy.get('[data-cy="general-message"]');
    });

    it('fails with wrong password', () => {
        cy.visit('/');
        cy.get('[data-cy="email"]').type('isaackilimok2@gmail.com');
        cy.get('[data-cy="password"]').type('123456');
        cy.get('[data-cy="login_submitBtn"]').click();
        cy.location('pathname').should('eq', '/');
        cy.get('[data-cy="general-message"]').should('be.visible');
    });

    it('fails with incorrect credentials', () => {
        cy.visit('/');
        cy.get('[data-cy="email"]').type('invalid@gmail.com');
        cy.get('[data-cy="password"]').type('345672');
        cy.get('[data-cy="login_submitBtn"]').click();
        cy.location('pathname').should('eq', '/');
        cy.get('[data-cy="general-message"]').should('be.visible');
    });

    it('fails with empty fields', () => {
        cy.visit('/');
        cy.get('[data-cy="login_submitBtn"]').click();
        cy.location('pathname').should('eq', '/');
        cy.get('[data-cy="general-message"]').should('be.visible');
    });
});

