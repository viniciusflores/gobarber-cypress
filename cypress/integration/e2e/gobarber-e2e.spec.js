/// <reference types="cypress" />

import locators from '../../support/locators'

describe('E2E Tests => Happy path', () => {
  before(() => {
    cy.fixture('user.json').then(user => Cypress.env('user', user))
  })

  beforeEach(() => {
    cy.visit('https://gobarber.semfila.club/')
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

  it('Should be insert provider avatar', () => {
    const { email, password } = Cypress.env('user')
    cy.loginWebGoBarber(email, password)
    cy.get(locators.DASHBOARD.LOGO).should('be.visible')

    cy.get(locators.DASHBOARD.PROFILE).click()

    let avatar = 'avatar.jpeg'
    cy.get(locators.PROFILE.AVATAR).attachFile(avatar)

    cy.get(locators.TOAST.TOAST_CONTAINER).should('be.visible')
    cy.get(locators.TOAST.CLOSE_TOAST_CONTAINER).should('be.visible').click()
  })

  it.only('Should be possible to see the schedules to tomorrow', () => {
    const { email, password } = Cypress.env('user')
    cy.loginWebGoBarber(email, password)
    cy.get(locators.DASHBOARD.LOGO).should('be.visible')

    cy.get(locators.DASHBOARD.TODAY).should('be.visible')
    cy.get(locators.DASHBOARD.FN_DAY_SELECTED('Thu Jul 30 2020')).click()
    cy.get(locators.DASHBOARD.TODAY).should('be.not.visible')
  })
})
