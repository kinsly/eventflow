describe('Checking user2 has access to user1 events', () => {
  beforeEach( () => {
    cy.login('user2@gmail.com', '920720455')
  })
  it('Event dashboard should be empty', () => {
    cy.get('[data-cy="event-name"]').should('not.exist');
   })

})