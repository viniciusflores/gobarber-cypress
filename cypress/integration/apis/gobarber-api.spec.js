/// <reference types="cypress" />

describe('Api Tests => Happy path', () => {
  before(() => {
    cy.fixture('user.json').then(user => Cypress.env('user', user))
  })

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

  it('Should be possible to do a login with already existing user', () => {
    const { name, email, password } = Cypress.env('user')
    cy.request({
      method: 'POST',
      url: '/sessions',
      body: {
        email,
        password,
      },
    }).as('response')

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body).to.have.property('token')
      expect(res.body).to.have.property('user')
      expect(res.body.user).to.have.property('id')
      expect(res.body.user).to.have.property('name', name)
    })
  })

  it('Should be a retriver profile information', () => {
    const { id, name, email, password } = Cypress.env('user')
    cy.createSessionAuthenticated(email, password)

    cy.request({
      method: 'GET',
      url: '/profile',
    }).as('response')

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body).to.have.property('id', id)
      expect(res.body).to.have.property('name', name)
      expect(res.body).to.have.property('email', email)
      expect(res.body).not.to.have.property('password')
      expect(res.body).to.have.property('avatar_url')
      expect(res.body).to.have.property('created_at')
      expect(res.body).to.have.property('updated_at')
    })
  })

  it('Should be a update profile information', () => {
    const { id, name, email, password } = Cypress.env('user')
    cy.createSessionAuthenticated(email, password)

    cy.request({
      method: 'put',
      url: '/profile',
      body: {
        name: 'John Doe Updated',
        email: 'johndoeupdated@email.com',
      },
    }).as('response')

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body).to.have.property('id', id)
      expect(res.body).to.have.property('name', 'John Doe Updated')
      expect(res.body).to.have.property('email', 'johndoeupdated@email.com')
      expect(res.body).not.to.have.property('password')
      expect(res.body).to.have.property('avatar_url')
      expect(res.body).to.have.property('created_at')
      expect(res.body).to.have.property('updated_at')
    })

    cy.request({
      method: 'put',
      url: '/profile',
      body: {
        name,
        email,
      },
    }).as('secondResponse')

    cy.get('@secondResponse').then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body).to.have.property('id', id)
      expect(res.body).to.have.property('name', name)
      expect(res.body).to.have.property('email', email)
    })
  })
})
