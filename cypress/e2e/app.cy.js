describe("Add Idea", () => {
  it("Creates a new idea and displays it on the page", () => {
    cy.visit("http://localhost:3000/");
    cy.get("button").contains("+").click();
    cy.findByLabelText("Title").type("test title");
    cy.findByLabelText("Description").type("test description");
    cy.get("button").contains("Submit").click();
    cy.get("h2").contains("test title");
    cy.get("p").contains("test description");
  });
});

describe("Edit Idea", () => {
  it("Edits an existing idea and displays changes on the page", () => {
    cy.visit("http://localhost:3000/");
    cy.get("button").contains("+").click();
    cy.findByLabelText("Title").type("test title");
    cy.findByLabelText("Description").type("test description");
    cy.get("button").contains("Submit").click();
    cy.get("button").contains("Edit").click();
    cy.findByLabelText("Title").type("edited title");
    cy.findByLabelText("Description").type("edited description");
    cy.get("button").contains("Submit").click();
    cy.contains("test title").should("not.exist");
    cy.contains("test description").should("not.exist");
    cy.get("p").contains("edited description");
  });
});

describe("Remove Idea", () => {
  it("Removes an idea", () => {
    cy.visit("http://localhost:3000/");
    cy.get("button").contains("+").click();
    cy.findByLabelText("Title").type("test title");
    cy.findByLabelText("Description").type("test description");
    cy.get("button").contains("Submit").click();
    cy.get("button").contains("Delete").click();
    cy.contains("test title").should("not.exist");
    cy.contains("test description").should("not.exist");
  });
});

describe("Persist Idea", () => {
  it("Saves newly created idea in local storage and displays it after page refresh", () => {
    cy.visit("http://localhost:3000/");
    cy.get("button").contains("+").click();
    cy.findByLabelText("Title").type("test title");
    cy.findByLabelText("Description").type("test description");
    cy.get("button").contains("Submit").click();
    cy.reload();
    cy.get("h2").contains("test title");
    cy.get("p").contains("test description");
  });
});
