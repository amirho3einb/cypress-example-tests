

describe("tasks page", () => {
  it("should render the main image", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".main-header img").should("have.length", 1);
  });
});
