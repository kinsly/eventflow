describe('Create new business - user1', () => {
  beforeEach( () => {
    cy.login('user1@gmail.com', '920720455')
  })

  it('Event dashboard should be empty', () => {
    cy.get("#react-burger-menu-btn").click();
    cy.get('[data-cy="link-create-business"]').click();
    cy.get('[data-cy="btn-create-business"]').click();

    cy.get('[data-cy="input-business-name"]').type("business one")
    cy.get('[data-cy="submit"]').click();

    //Check business card is shown
    cy.get('[data-cy="business-name"]').should('contain','business one')

   })

   it('edit business', () => {
    cy.get("#react-burger-menu-btn").click();
    cy.get('[data-cy="link-create-business"]').click();
    
    cy.contains('[data-cy="business-card"]','business one').parent().find('[data-cy="btn-edit-business"]').click()
    cy.wait(2000)
    cy.get('[data-cy="input-edit-business"]').clear().type("business one edited")
    cy.get('[data-cy="submit-edit-business"]').click();

    //Check business card is shown
    cy.get('[data-cy="business-name"]').should('contain','business one edited')
    
   })

   it('delete business', () => {
    
    cy.get("#react-burger-menu-btn").click();
    cy.get('[data-cy="link-create-business"]').click();
    
    cy.contains('[data-cy="business-card"]','business one edited').parent().find('[data-cy="btn-delete-business"]').click()
    cy.get('[data-cy="alert-delete"]').click(); 
    cy.contains('[data-cy="business-card"]','business one edited').should('not.exist');


   })

})