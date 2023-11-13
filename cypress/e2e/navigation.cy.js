describe("page navigation", () => {
  it("should navigate beetween pages", () => {
    cy.visit("http://localhost:5173/");
    // cy.get("header a").last();
    cy.get('[data-cy = "header-about-link"]').click();
    // cy.get("h1").contains("About Us").should("have.length", 1);
    cy.location("pathname").should("eq", "/about");
    cy.get('[data-cy = "header-home-link"]').click();
    // cy.get("h1").contains("Home Page").should("have.length", 1);
    cy.location("pathname").should("eq", "/");
  });
});
