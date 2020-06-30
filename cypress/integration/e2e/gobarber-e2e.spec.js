/// <reference types="cypress" />

import locators from '../../support/locators'

describe('E2E Tests => Happy path', () => {
  before(() => {
    cy.fixture('user.json').then(user => Cypress.env('user', user))
  })

  beforeEach(() => {
    cy.visit('https://rocketseat-gobarber-web.herokuapp.com/')
  })

  afterEach(() => {
    cy.clearLocalStorage()
  })

  it('Should be possible to create a new account', () => {
    const { email, password } = Cypress.env('user')
    cy.get(locators.SIGNIN.EMAIL).type(email)
    cy.get(locators.SIGNIN.PASSWORD).type(password)
    cy.get(locators.SIGNIN.BTN_LOGIN).click()

    cy.get(locators.DASHBOARD.LOGO).should('be.visible')
  })
})
