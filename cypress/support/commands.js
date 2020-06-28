Cypress.Commands.overwrite('request', (originalFn, ...options) => {
  if (options.length === 1) {
    if (Cypress.env('token')) {
      options[0].headers = { Authorization: `Bearer ${Cypress.env('token')}` }
    }
  }
  return originalFn(...options)
})

Cypress.Commands.add('loginOnGoBarber', (email, password) => {
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
      Cypress.env('token', response.token)
      Cypress.env('user', response.user)
      return response
    })
})
