describe('Bad responses', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/urls', {
      "urls": [
          {
              "id": 1,
              "long_url": "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
              "short_url": "http://localhost:3001/useshorturl/1",
              "title": "Awesome photo"
          }
      ]
    })
    cy.visit('http://localhost:3000/')
  })

  it('Should display an error message to the user if there is a server error on getUrls', () => {
    cy.intercept('http://localhost:3001/api/v1/urls', {
      statusCode: 501,
      ok: false
    })
    cy.visit('http://localhost:3000/')

    cy.get('p[name="error"]').should('be.visible')
  })

  it('Should display the error message when server response is bad on postNewUrl', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 501,
      ok: false
    })
    cy.visit('http://localhost:3000/')

    cy.get('input[name="title"]').type('Test post')
    cy.get('input[name="url"]').type('https://github.com/RickV85/url-shortener-ui')
    cy.get('button').click()

    cy.get('p[name="error"]').should('be.visible')
  })
})