function openAndCheck(command) {
  cy.contains("Add Task").click();
  command();
  cy.get(".backdrop").should("not.exist");
  cy.get(".modal").should("not.exist");
}

describe("tasks managment", () => {
  it("should open and close the new task modal", () => {
    cy.visit("http://localhost:5173/");

    openAndCheck(() => {
      cy.get(".backdrop").click({
        force: true,
      });
    });

    openAndCheck(() => {
      cy.contains("Cancel").click();
    });
  });
});
