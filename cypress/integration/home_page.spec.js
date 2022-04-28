/// <reference types="cypress" />

context("HomePage", () => {
  beforeEach(() => {
    cy.task("initSocket");
  });
  afterEach(() => {
    cy.task("disconnectSocket");
  });

  it("can create a new game", () => {
    cy.visit("/");

    cy.get("button[data-testid='create-game-button']").click();

    cy.url().should("include", "game/");
    cy.get("dialog[data-testid='wait-player-dialog']").should("be.visible");
  });

  it("can join an existing game", () => {
    cy.visit("/");

    cy.request("POST", "http://localhost:5000/games/new").then((res) => {
      cy.wrap(res.body.gameId).as("gameID");
    });

    cy.get("@gameID").then((gameID) => {
      cy.task("join", gameID);

      cy.visit(`/game/${gameID}`);

      cy.get("div[data-testid='game-board']").should("be.visible");
      cy.contains("You're Player 2");
      cy.contains("Current Player: Player 1");
    });
  });
});
