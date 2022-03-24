/// <reference types="cypress"/>

import { waitForDebugger } from "inspector";

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

context("Signup Authentication tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Should open up the login modal", () => {
    cy.get(".login_btn").first().click();
  });
  it("Should error message if the input is not a real email", () => {
    cy.get(".login_btn").first().click();
    cy.get("[type=text]").type(`notmail.com`);
    cy.get("[type=submit]").click();
    cy.contains("The email address is badly formatted.").should("exist");
  });
  it("Should an error message when a user doesn't exist", () => {
    cy.get(".login_btn").first().click();
    cy.get("[type=text]").type(`zach@notmail.com`);
    cy.get("[type=password]").type(`a password`);
    cy.get("[type=submit]").click();
    cy.contains(
      "There is no user record corresponding to this identifier. The user may have been deleted."
    ).should("exist");
  });
  it("Should login as normal when the details are correct", () => {
    cy.get(".login_btn").first().click();
    cy.get("[type=text]").type(`auth-folio@folio-swatched.com`);
    cy.get("[type=password]").type(`w[U[U,{*Xq>P3>%b`);
    cy.get("[type=submit]").click();
    cy.get(".menu_wrapper").should("exist");
    cy.get(".menu_wrapper").click();
    cy.contains("logout").click();
  });
});

// context("Login Authentication tests", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000");
//   });
//   it("Should open up the login modal", () => {
//     cy.get(".login_btn").first().click();
//   });
//   it("Should error message if the input is not a real email", () => {
//     cy.get(".login_btn").first().click();
//     cy.get("[type=text]").type(`notmail.com`);
//     cy.get("[type=submit]").click();
//     cy.contains("The email address is badly formatted.").should("exist");
//   });
//   it("Should an error message when a user doesn't exist", () => {
//     cy.get(".login_btn").first().click();
//     cy.get("[type=text]").type(`zach@notmail.com`);
//     cy.get("[type=password]").type(`a password`);
//     cy.get("[type=submit]").click();
//     cy.contains(
//       "There is no user record corresponding to this identifier. The user may have been deleted."
//     ).should("exist");
//   });
//   it("Should login as normal when the details are correct", () => {
//     cy.get(".login_btn").first().click();
//     cy.get("[type=text]").type(`auth-folio@folio-swatched.com`);
//     cy.get("[type=password]").type(`w[U[U,{*Xq>P3>%b`);
//     cy.get("[type=submit]").click();
//     cy.get(".menu_wrapper").should("exist");
//     cy.get(".menu_wrapper").click();
//     cy.contains("logout").click();
//   });
// });
