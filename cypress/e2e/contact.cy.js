describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy = "contact-input-name"]').type("Sama");
    cy.get('[data-cy = "contact-input-message"]').type("I love You");
    cy.get('[data-cy = "contact-input-email"]').type("sama@gmail.com");
    cy.get('[data-cy = "contact-btn-submit"]').as("submitBtn");
    cy.get("@submitBtn").then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.match(/^Send Message/);
    });
    // cy.get("@submitBtn")
    //   .contains("Send Message")
    //   .and("not.have.attr", "disabled");

    cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending").should("have.attr", "disabled");
  });
});
