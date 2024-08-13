describe('Adding new events- user1', () => {
  beforeEach( () => {
    cy.login('user1@gmail.com', '920720455')
  })
  
  it('Edit event data by user1', () => {
    cy.wait(3000)
    // Click on add event floating button as a personal account
    cy.contains('[data-cy="event-name"]', 'Event with full detail - user1').click();

    // Should be on a new URL which is showing event details.
    cy.url().should('contain', '/events/show')

    //Go to event edit.
    cy.get('[data-cy="event-edit"]').click()
    cy.url().should('contain', '/events/edit')

    cy.get('[data-cy="name"]').should('be.visible')

    
    cy.get('[data-cy="name"]').clear().type('Edited - Event with full detail - user1')
    cy.get('[data-cy="description"]').clear().type('Edited - user1 description')
    cy.get('[data-cy="telephone_1"]').clear().type('0711230600')
    cy.get('[data-cy="telephone_2"]').clear().type('0711230700')

    cy.get('[data-cy="cost"]').clear().type('30000')

    
    //Change added deposit and date
    cy.get('[data-cy="input-deposit"]').clear().type('20000')
    cy.get('.cy-datapicker').eq(0).clear().type('10/06/2024')
    
    //Add another deposit
    cy.get('[data-cy="btn-add-deposit"]').click()
    cy.get('[data-cy="input-deposit"]').eq(1).type('5000')
    cy.get('.cy-datapicker').eq(1).type('12/06/2024')

    //Change event date
    cy.get('.cy-datapicker').eq(2).clear().type('13/06/2024')

    cy.get('.cy-time-picker').eq(0).clear().type('09:30 AM')
    cy.get('.cy-time-picker').eq(1).clear().type('03:30 PM')
    cy.get('[data-cy="submit"]').click()
  })

  it('Check edited data by user1', () => {
    cy.wait(3000)
    // Click on add event floating button as a personal account
    cy.contains('[data-cy="event-name"]', 'Edited - Event with full detail - user1').click();

    // Should be on a new URL which is showing event details.
    cy.url().should('contain', '/events/show')

    cy.get('[data-cy="name"]').should('contain','Edited - Event with full detail - user1');
    cy.get('[data-cy="description"]').should('contain','Edited - user1 description');

    cy.get('[data-cy="from"]').should('contain','9:30 AM');
    cy.get('[data-cy="to"]').should('contain','03:30 PM');

    cy.get('[data-cy="telephone_1"]').should('contain',' 0711230600');
    cy.get('[data-cy="telephone_2"]').should('contain','0711230700');

    cy.get('[data-cy="cost"]').should('contain','30000');
    cy.get('[data-cy="balance"]').should('contain','5000');

    cy.get('[data-cy="deposits"]').eq(0).should('contain','20000');
    cy.get('[data-cy="deposits-date"]').eq(0).should('contain','2024-10-06');

    cy.get('[data-cy="deposits"]').eq(1).should('contain','5000');
    cy.get('[data-cy="deposits-date"]').eq(1).should('contain','2024-12-06')
  })


})