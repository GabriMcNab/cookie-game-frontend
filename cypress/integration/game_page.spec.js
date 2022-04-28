/// <reference types="cypress" />

context("GamePage", () => {
  beforeEach(() => {
    cy.task("initSocket");

    cy.visit("/");

    cy.get("button[data-testid='create-game-button']").click();
    cy.location("pathname").then((path) => {
      const gameID = path.split("game/")[1];
      cy.wrap(gameID).as("gameID");
    });

    cy.get("dialog[data-testid='wait-player-dialog']").should("be.visible");
    cy.get("div[data-testid='game-board']").should("not.exist");

    cy.get("@gameID").then((gameID) => {
      cy.url().should("include", `game/${gameID}`);
      cy.task("join", gameID);
    });
  });
  afterEach(() => {
    cy.task("disconnectSocket");
  });

  it("can set a move when the game is ready", () => {
    cy.get("div[data-testid='game-board']").should("be.visible");
    cy.contains("You're Player 1");
    cy.contains("Current Player: Player 1");

    cy.get("div[data-testid='game-box-border-3-1-west")
      .click()
      .should("have.class", "selected");
    cy.get("div[data-testid='game-box-border-2-1-east").should(
      "have.class",
      "selected"
    );

    cy.contains("Current Player: Player 2");
  });

  it("updates the game board with other player's moves", () => {
    cy.get("div[data-testid='game-box-border-3-1-west").click();
    cy.contains("Current Player: Player 2");

    cy.task("move", { border: "west", position: [3, 2] });
    cy.get("div[data-testid='game-box-border-3-2-west").should(
      "have.class",
      "selected"
    );
    cy.get("div[data-testid='game-box-border-2-2-east").should(
      "have.class",
      "selected"
    );
    cy.contains("Current Player: Player 1");
  });

  it("correctly updates the score when the box is completed", () => {
    cy.get("div[data-testid='game-box-border-3-1-west").click();
    cy.task("move", { border: "west", position: [3, 2] });

    cy.get("div[data-testid='game-box-border-3-1-south").click();
    cy.get("[data-testid='game-score-player-1']").should(
      "include.text",
      "score: 1"
    );
    cy.get("[data-testid='game-box-3-1']")
      .find("svg[data-testid='svg-cross']")
      .should("exist");
    cy.contains("Current Player: Player 1");

    cy.get("div[data-testid='game-box-border-3-3-south").click();
    cy.task("move", { border: "south", position: [2, 1] });
    cy.get("[data-testid='game-score-player-2']").should(
      "include.text",
      "score: 1"
    );
    cy.get("[data-testid='game-box-2-1']")
      .find("svg[data-testid='svg-oval']")
      .should("exist");
    cy.contains("Current Player: Player 2");
  });
});
