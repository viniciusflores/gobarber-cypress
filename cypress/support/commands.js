import 'cypress-file-upload'
import locators from './locators'

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
  if (options.length === 1) {
    if (Cypress.env('authorizedSession')) {
      options[0].headers = {
        Authorization: `Bearer ${Cypress.env('authorizedSession')}`,
      }
    }
  }
  return originalFn(...options)
})

Cypress.Commands.add('createSessionAuthenticated', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/sessions',
    body: {
      email,
      password,
    },
  })
    .its('body')
    .should('not.be.empty')
    .then(response => {
      Cypress.env('authorizedSession', response.token)
      return response
    })
})

Cypress.Commands.add('loginWebGoBarber', (email, password) => {
  cy.get(locators.SIGNIN.EMAIL).type(email)
  cy.get(locators.SIGNIN.PASSWORD).type(password)
  cy.get(locators.SIGNIN.BTN_LOGIN).click()
})

Cypress.Commands.add(
  'updateUserProfile',
  (name, email, password, newPassword) => {
    cy.get(locators.PROFILE.NAME).clear().type(name)
    cy.get(locators.PROFILE.EMAIL).clear().type(email)
    cy.get(locators.PROFILE.OLD_PASSWORD).type(password)
    cy.get(locators.PROFILE.PASSWORD).type(newPassword)
    cy.get(locators.PROFILE.PASSWORD_CONFIRMATION).type(newPassword)
    cy.get(locators.PROFILE.BTN_CONFIRM).click()
  },
)
