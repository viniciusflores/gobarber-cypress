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
