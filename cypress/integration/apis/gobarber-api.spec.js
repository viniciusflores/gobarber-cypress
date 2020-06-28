/// <reference types="cypress" />

describe('Api Tests => Happy path', () => {
  it('Should be possible to create a new account', () => {
    cy.request({
      method: 'POST',
      url: '/users',
      body: {
        name: 'John Doe',
        email: `teste${Date.now()}@email.com`,
        password: '123456',
      },
    }).as('response')

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('name', 'John Doe')
      expect(res.body).to.have.property('email')
      expect(res.body).not.to.have.property('password')
      expect(res.body).to.have.property('avatar_url')
      expect(res.body).to.have.property('created_at')
      expect(res.body).to.have.property('updated_at')
    })
  })

  it.only('Should be possible to do a login with already existing user', () => {
    cy.fixture('user.json').then(user => {
      cy.request({
        method: 'POST',
        url: '/sessions',
        body: {
          email: user.email,
          password: user.password,
        },
      }).as('response')
    })

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body).to.have.property('token')
      expect(res.body).to.have.property('user')
      expect(res.body.user).to.have.property('id')
    })
  })
})
