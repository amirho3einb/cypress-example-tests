describe("Newsletter", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  it("should dispay a success message", () => {
    cy.intercept("POST", "/newsletter*", {
      status: 201,
    }).as("subscribe"); // intercept any HTTP rrquest
    cy.visit("/");
    cy.get('[data-cy="newsletter-email"]').click();
    cy.get('[data-cy="newsletter-email"]').should("not.be.disabled");
    cy.get('[data-cy="newsletter-email"]').type("test@gmail.com");
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait("@subscribe");
    cy.contains("Thanks for signing up!");
  });
});
