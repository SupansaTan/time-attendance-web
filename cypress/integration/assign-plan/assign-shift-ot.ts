/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

/* Department Head select both of assign and ot mode */

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

})

And('I should see "งานเชือดไก่", "งานถอนขนไก่" and "งานไก่ตกราว"', () => {

})

When('I press "งานเชือดไก่"', () => {

})

Then('I should be on the Assign Plan Page', () => {

})

And('I should see "Assign"', () => {

})

When('I click on "Shift" Mode', () => {

})

And('I select "From" with "12/09/2564"', () => {

})

And('I select "To" with "12/09/2564"', () => {

})

Then('I can see "Employees" Table', () => {

})

And('I click checkbox of "ภูวดล พาสกุล"', () => {

})

And('I select "Shift" with "09:00"', () => {

})

And('I select "OT" with "2.5"', () => {

})

And('I press "Submit"', () => {

})

Then('I should see "09:00 - 17:00" in "Shift" field of "ภูวดล พาสกุล"', () => {

})

And('I should see "2.5" in "OT Plan" field of "ภูวดล พาสกุล"', () => {

})
