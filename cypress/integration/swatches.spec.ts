/// <reference types="cypress"/>

import { waitForDebugger } from "inspector";

context("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/swatches");
  });

  // it("Should render the page and dispay the dropdown", () => {
  //   cy.get(".dropdown_selected").should(`exist`);
  // });
  // it("Should display the swatch adder button, and the plus should be visible", () => {
  //   cy.get(".swatch_adder_card").should(`exist`);
  //   cy.get(".adder_button").should("be.visible");
  // });
  it("The first colour should be hidden when not hovering", () => {
    cy.get(".swatch_hover_button").should("have.css", "opacity", "0");
    cy.get(".adder_button").first().trigger("mouseover");
  });
  // it("Locking one colour should change all the other colour swatches", () => {
  //   cy.get(".menu_circle").first().click();
  // });
});

