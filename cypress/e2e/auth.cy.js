describe("Auth", () => {
  //   beforeEach(() => {
  //     cy.task("seedDatabase");
  //   });
  it("should singup", () => {
    cy.visit("/signup");
    cy.get('[data-cy="auth-email"]').click();
    cy.get('[data-cy="auth-email"]').should("not.be.disabled");
    cy.get('[data-cy="auth-email"]').type("amirbalgar1377@example.com");
    cy.get('[data-cy="auth-password"]').click();
    cy.get('[data-cy="auth-password"]').should("not.be.disabled");
    cy.get('[data-cy="auth-password"]').type("42153466");
    cy.get('[data-cy="auth-submit"]').click();
    cy.location("pathname").should("eq", "/takeways");
    cy.getCookie("__session").its("value").should("not.be.empty");
  });
  it("should login", () => {
    cy.login();

    cy.contains("Logout").click();
    cy.location("pathname").should("eq", "/");
    cy.getCookie("__session").its("value").should("be.empty");
  });
});
