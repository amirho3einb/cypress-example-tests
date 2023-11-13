describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy = "contact-input-name"]').type("Sama");
    cy.get('[data-cy = "contact-input-message"]').type("I love You");
    cy.get('[data-cy = "contact-input-email"]').type("sama@gmail.com");
    cy.get("form button").contains("Send Message");
    cy.get("form button").should("not.have.attr", "disabled");
    cy.get("form button").click();
    cy.get("form button").contains("Sending");
    cy.get("form button").should("have.attr", "disabled");
  });
});
