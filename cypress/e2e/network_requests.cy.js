/// <reference types="cypress" />
describe('Lead Tracking', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://api.escale.com.br/broker-middleware/v1/event', { statusCode: 200 })
      .as('event')
    cy.intercept('GET', 'https://api.ipify.org/?format=json', { statusCode: 200 })
      .as('ip')


    cy.visit('http://localhost:3000')
    .its('LeadTracking').should('be.a', 'function')
  })

  it('makes pageview event calls', () => {
    // Home
    cy.wait('@event').its('request.body')
    .then((body) => {
      expect(body.event_type).to.eq('pageview');
      expect(body.brand).to.eq('e2e-tests');
    })

    // Page 1
    cy.contains('Page 1').click()
    cy.hash().should('equal', '#page-1')
    cy.wait('@event', {timeout: 10000}).its('request.body')
      .then((body) => {
        cy.log(body.brand)
        expect(body.event_type).to.eq('click');
        expect(body.page_url).to.eq('http://localhost:3000/#page-1')
        expect(body.click_url).to.eq('http://localhost:3000/#page-1')
        
        expect(body.brand).to.eq('e2e-tests');
      })
    cy.wait('@event').its('request.body')
    .then((body) => {
      expect(body.event_type).to.eq('pageview');
      expect(body.page_url).to.eq('http://localhost:3000/#page-1')
      expect(body.brand).to.eq('e2e-tests');
    })
    cy.wait('@ip').its('response.statusCode').should('equal', 200)
    
    // Page 2
    cy.contains('Page 2').click()
    cy.hash().should('equal', '#page-2')
    cy.wait('@event').its('request.body')
    .then((body) => {
      expect(body.event_type).to.eq('click');
      expect(body.page_url).to.eq('http://localhost:3000/#page-2')
      expect(body.click_url).to.eq('http://localhost:3000/#page-2')
      expect(body.brand).to.eq('e2e-tests');
    })

    cy.wait('@event').its('request.body')
    .then((body) => {
      expect(body.event_type).to.eq('pageview');
      expect(body.page_url).to.eq('http://localhost:3000/#page-2')
      expect(body.brand).to.eq('e2e-tests');
    })
    cy.wait('@ip').its('response.statusCode').should('equal', 200)
  })

})