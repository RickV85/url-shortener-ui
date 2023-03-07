describe('App', () => {
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
  }
    )
    cy.visit('http://localhost:3000/')
  })

  it('Should display the page title', () => {
    cy.get('h1').should('have.text', 'URL Shortener')
  })

  it('Should display the existing shortened URLs', () => {
    cy.get('div[class="url"]').eq(0).should('contain', 'Awesome photo')
    cy.get('div[class="url"]').eq(0).should('contain', 'http://localhost:3001/useshorturl/1')
    cy.get('div[class="url"]').eq(0).should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

  it('Should display the form with proper inputs', () => {
    cy.get('form').should('be.visible')
    cy.get('input[name="title"]').should('be.visible')
    cy.get('input[name="url"]').should('be.visible')
    cy.get('button').should('be.visible')
  })

  it('Should update the values of inputs as a user types', () => {
    cy.get('input[name="title"]').type('Test URL')
    cy.get('input[name="url"]').type('https://github.com/RickV85/url-shortener-ui')

    cy.get('input[name="title"]').should('have.value', 'Test URL')
    cy.get('input[name="url"]').should('have.value', 'https://github.com/RickV85/url-shortener-ui')
  })

  it('Should display the user created URL tile on successful POST', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
    statusCode: 201,
    body: {
      "long_url": "https://github.com/RickV85/url-shortener-ui",
      "title": "Test post",
      "id": 2,
      "short_url": "http://localhost:3001/useshorturl/2"
      }
    })

    cy.get('input[name="title"]').type('Test post')
    cy.get('input[name="url"]').type('https://github.com/RickV85/url-shortener-ui')
    cy.get('button').click()

    cy.get('div[class="url"]').eq(1).should('contain', 'Test post')
    cy.get('div[class="url"]').eq(1).should('contain', 'http://localhost:3001/useshorturl/2')
    cy.get('div[class="url"]').eq(1).should('contain', 'https://github.com/RickV85/url-shortener-ui')
  })
})