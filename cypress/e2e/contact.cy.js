describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("/about");
    cy.get('[data-cy = "contact-input-name"]').type("Sama");
    cy.get('[data-cy = "contact-input-message"]').type("I love You");
    // cy.get('[data-cy = "contact-input-email"]').type("sama@gmail.com");
    cy.get('[data-cy = "contact-btn-submit"]').as("submitBtn");
    cy.get("@submitBtn").then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.match(/^Send Message/);
    });
    cy.get('[data-cy = "contact-input-email"]').type("sama@gmail.com{enter}");
    // cy.get("@submitBtn")
    //   .contains("Send Message")
    //   .and("not.have.attr", "disabled");

    // cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.visit("/about");
    cy.get('[data-cy = "contact-btn-submit"]').as("submitBtn");
    cy.get("@submitBtn").click();
    cy.get("@submitBtn").then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending");
    });
    cy.get("@submitBtn").contains("Send Message");

    cy.get('[data-cy = "contact-input-message"]').focus().blur();

    cy.get('[data-cy = "contact-input-message"]')
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).to.contains("invalid");
      });

    cy.get('[data-cy = "contact-input-name"]').focus().blur();
    cy.get('[data-cy = "contact-input-name"]')
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).to.contains("invalid");
      });

    cy.get('[data-cy = "contact-input-email"]').focus().blur();
    cy.get('[data-cy = "contact-input-email"]')
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).to.contains("invalid");
      });
  });
});
