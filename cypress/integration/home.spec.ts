/// <reference types="cypress"/>

context("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should render the home page and display 5 swatchs", () => {
    cy.get(".swatch_area .swatch_card").should("have.length", 5);
  });
  it("Should re-render the colours when the refresh button is clicked", () => {
    cy.get(".swatch_area .swatch_card").should("have.length", 5);
  });
  it("Locking one colour should change all the other colour swatches", () => {
    cy.get(".lock").first().click();
  });
});

export {};

// Tests to run

// Home

// Copy to Clip
// Save button to swatches (logged in)
// Lock swatch
// Lock and refresh
// Sign up
// Login

// Swatches

// View swatches
// Add swatch
// Compare swatch
// Add & remove colours in comparer
//
//
