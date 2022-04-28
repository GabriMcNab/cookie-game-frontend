/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const io = require("socket.io-client");

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on) => {
  let socket;
  on("task", {
    /**
     * Used to initialize a socket for a 2nd player
     */
    initSocket() {
      socket = io("http://localhost:5000");
      return null;
    },
    /**
     * Used to disconnect the 2nd player
     */
    disconnectSocket() {
      socket.disconnect();
      return null;
    },
    /**
     * Used to join a specific game with 2nd player
     * @param {*} gameID ID of the game to join
     */
    join(gameID) {
      socket.emit("joinGame", gameID);
      return null;
    },
    /**
     * Used to set the move for the 2nd player
     * @param {*} border Border clicked
     * @param {*} position Position of the game box clicked
     */
    move({ border, position }) {
      socket.emit("playerMove", { border, position }, ({ status }) => {
        if (status === "KO") {
          console.error("Error while setting the player's move!");
        }
      });
      return null;
    },
  });
};
