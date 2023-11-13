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

  it("should create a new task", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get("#title").type("New Task");
    cy.get("#summary").type("Some description");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
    cy.get(".task").should("have.length", 1);
    cy.get(".task h2").contains("New Task");
    cy.get(".task p").contains("Some description");
  });

  it("should validate user input", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".modal").contains("Add Task").click();
    cy.contains("Please provide values");
  });

  it("should filter tasks", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get("#title").type("New Task");
    cy.get("#summary").type("Some description");
    cy.get("#category").select("urgent");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
    cy.get("#filter").select("moderate");
    cy.get(".task").should("have.length", 0);
    cy.get("#filter").select("urgent");
    cy.get(".task").should("have.length", 1);
    cy.get("#filter").select("All");
    cy.get(".task").should("have.length", 1);
  });

  it("should add multiple tasks", () => {
    const tasks = [
      {
        title: "New Task",
        summary: "Some New description",
        category: "urgent",
      },
      {
        title: "old Task",
        summary: "Some old description",
        category: "moderate",
      },
    ];
    cy.visit("http://localhost:5173/");

    for (const task of tasks) {
      cy.contains("Add Task").click();
      cy.get("#title").type(task.title);
      cy.get("#summary").type(task.summary);
      cy.get("#category").select(task.category);
      cy.get(".modal").contains("Add Task").click();
      cy.get(".backdrop").should("not.exist");
      cy.get(".modal").should("not.exist");
    }
    cy.get(".task").should("have.length", tasks.length);

    for (const task of tasks) {
      cy.get(".task h2").contains(task.title);
      cy.get(".task p").contains(task.summary);
    }
  });
});
