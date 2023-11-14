describe("contact form", () => {
  before(() => {
    // runs only once, before all tests
  });
  beforeEach(() => {
    // runs before every test (i.e, it's repeated)
    cy.visit("/about");
  });
  afterEach(() => {
    // runs after every test
  });
  after(() => {
    // runs after all tests
  });

  it("should submit the form", () => {
    cy.getById("contact-input-name").type("Sama");
    cy.getById("contact-input-message").type("I love You");
    // cy.getById('contact-input-email').type("sama@gmail.com");
    cy.getById("contact-btn-submit").as("submitBtn");
    cy.get("@submitBtn").then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.match(/^Send Message/);
    });
    cy.getById("contact-input-email").type("sama@gmail.com{enter}");
    // cy.get("@submitBtn")
    //   .contains("Send Message")
    //   .and("not.have.attr", "disabled");

    // cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.get('form button[type="submit').as("submitBtn");
    cy.submitForm();
    cy.get("@submitBtn").then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending");
    });
    cy.get("@submitBtn").contains("Send Message");

    cy.getById("contact-input-message").focus().blur();

    cy.getById("contact-input-message")
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).to.contains("invalid");
      });

    cy.getById("contact-input-name").focus().blur();
    cy.getById("contact-input-name")
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).to.contains("invalid");
      });

    cy.getById("contact-input-email").focus().blur();
    cy.getById("contact-input-email")
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).to.contains("invalid");
      });
  });
});
