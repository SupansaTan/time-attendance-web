/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

/* See all departments */

Given('I visit on the login page', () => {
  cy.visit('/auth/login');
})

When('I fill in "email" with "5@gmail.com"', () => {
  cy.get("[type='email']").type('5@gmail.com')
})

And('I fill in "password" with "0005"', () => {
  cy.get('[type="password"]').type('0005')
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

And('I should see "ถอนขนไก่ 1" and "งานไก่ตกราว 1" ', () => {
  cy.get('.contain-wrapper').contains("ถอนขนไก่ 1")
  cy.contains("งานไก่ตกราว 1")
})
