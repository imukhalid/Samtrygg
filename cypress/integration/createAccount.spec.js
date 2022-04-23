import createAccount from "../src/createAccount"
import selector from '../fixtures/selectors.json'
describe('Creating New Account', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    beforeEach('login', () =>
    {   
      cy.visit('/')
      // Changing language to English
      cy.get(selector.languageButton).click()
      cy.get(selector.h1Text).should('have.text','Explore your future home')
    })
    it('Creating Tenant Account', () => {
      createAccount.creatingTenantAccount()   
    })

    it('Creating Landlord Account', () => {
      createAccount.creatingLandlordAccount()
    })
})