/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

/* See all departments */

Given('I visit on the login page', () => {
  cy.visit('/auth/login');
})

When('I fill in "email" with "7@gmail.com"', () => {
  cy.get("[type='email']").type('7@gmail.com')
})

And('I fill in "password" with "0007"', () => {
  cy.get('[type="password"]').type('0007')
}) 

And('I press "Login"', () => {
  cy.get('form').submit() 
})

Then('I should be on the dashboard page', () => {
  cy.visit('/dashboard')
})

When('I click Assign Plan', () => {
  cy.get('.navbar-wrapper').contains('Assign Plan').click() /*get เอามาจาก class tag*/
})

Then('I should be on the assign plan page', () => {
  cy.visit('/assign-plan')
})

Then('I should see "Departments"', () => {
  cy.get('.contain-wrapper').contains('Departments')
})

And('I should see "เชือดไก่ 1" and "ถอนขนไก่ 1"', () => {
  cy.get('.contain-wrapper').contains("เชือดไก่ 1")
  cy.contains("ถอนขนไก่ 1")
})
