import selector from "../fixtures/selectors.json"
import Credentials from "../fixtures/credentials.json"

class CreateAccount{
    // Filling the Registration form
    tenantAndLandlord(tenantOrLandlord){
        // Selecting Tenant or Landlord
        cy.get(tenantOrLandlord).click()
        
        cy.get(tenantOrLandlord).then( $open => {
            const selected = ($open.selector.includes(selector.tenant)) ? "tenant" :  "landlord"
            const {firstName, lastName, phoneNumber, email, password, confirmPassword} = Credentials[selected]
            
            // First Name
            cy.get(selector.firstNameLabel).click()
            cy.get(selector.firstName).type(firstName)
            cy.get(selector.firstName).should('have.value',firstName)

            // Sur Name
            cy.get(selector.lastNameLabel).click()
            cy.get(selector.lastName).type(lastName)
            cy.get(selector.lastName).should('have.value',lastName)

            // Phone
            cy.get(selector.phoneLabel).click()
            cy.get(selector.phone).type(phoneNumber)
            cy.get(selector.phone).should('have.value',phoneNumber)

            // Email
            cy.get(selector.emailLabel).click()
            cy.get(selector.email).type(email)
            cy.get(selector.email).should('have.value',email)

            // Password
            cy.get(selector.passwordLabel).click()
            cy.get(selector.password).type(password)
            cy.get(selector.password).should('have.value',password)
        
            // Confirm Password
            cy.get(selector.confirmpasdLabel).click()
            cy.get(selector.confirmpasd).type(confirmPassword)
            cy.get(selector.confirmpasd).should('have.value',confirmPassword)

            // Submitting the form
            cy.get(selector.submitButton).click()
            cy.get('body').then($body => {
                if($body.text().includes("Verify your e-mail")){
                    cy.get(selector.emailVerificationText).should('contain','Verify your e-mail')
                } else {
                    cy.get(selector.accountAlreadyExistMessage).should('contain','You have already registered. Please login below.')
                }
            })
        })
    }

    // Creating tenant account
    creatingTenantAccount(){
        cy.get(selector.createAnAccount).contains('Create an account').click()
        cy.get(selector.h2text).should('have.text','Create an account')
        // Calling function
        this.tenantAndLandlord(selector.tenant)
    }

    // Creating landlord account
    creatingLandlordAccount(){
        cy.get(selector.createAnAccount).contains('Create an account').click()
        cy.get(selector.h2text).should('have.text','Create an account')
        // calling function
        this.tenantAndLandlord(selector.landlord)
    }
}
export default new CreateAccount