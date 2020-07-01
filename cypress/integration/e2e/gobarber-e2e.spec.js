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

  it('Should be possible to perform a login', () => {
    const { email, password } = Cypress.env('user')
    cy.loginWebGoBarber(email, password)

    cy.get(locators.DASHBOARD.LOGO).should('be.visible')
  })

  it('Should be possible to create a new account', () => {
    cy.get(locators.SIGNIN.BTN_CREATE_ACCOUNT).click()

    cy.get(locators.SIGNUP.NAME).should('be.visible').type('John Doe')
    cy.get(locators.SIGNUP.EMAIL).type(`teste${Date.now()}@email.com`)
    cy.get(locators.SIGNUP.PASSWORD).type('123456')

    cy.get(locators.SIGNUP.BTN_CREATE).click()

    cy.get(locators.TOAST.TOAST_CONTAINER).should('be.visible')
    cy.get(locators.TOAST.CLOSE_TOAST_CONTAINER).should('be.visible').click()
  })
})
