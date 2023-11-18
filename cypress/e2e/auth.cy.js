describe("Auth", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  it("should singuo", () => {
    cy.visit("/signup");
    cy.get('[data-cy="auth-email"]').click();
    cy.get('[data-cy="auth-email"]').should("not.be.disabled");
    cy.get('[data-cy="auth-email"]').type("test2@gmail.com");
    cy.get('[data-cy="auth-password"]').click();
    cy.get('[data-cy="auth-password"]').should("not.be.disabled");
    cy.get('[data-cy="auth-password"]').type("123456");
    cy.get('[data-cy="auth-submit"]').click();
    cy.location("pathname").should("eq", "/takeways");
    cy.getCookie("__session").its("value").should("not.be.empty");
  });
});
