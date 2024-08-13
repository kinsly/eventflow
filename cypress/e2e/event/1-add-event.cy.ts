describe('Adding new events- user1', () => {
  beforeEach( () => {
    cy.login('user1@gmail.com', '920720455')
  })
  it('Create event with name only for year 2024', () => { 

    // Click on add event floating button as a personal account
    cy.get('[data-cy="add-event-btn"]').click()

    // Should be on a new URL which is
    cy.url().should('include', '/events/store')
    cy.get('[data-cy="name"]').should('be.visible')

    //add event name and submit
    cy.get('[data-cy="name"]').type('Name only event by user1 for year 2024')
    cy.get('.cy-datapicker').eq(0).type('20/07/2024')
    cy.get('[data-cy="submit"]').click()

    //Should be back to 
    cy.url().should('include', '/events')
    cy.wait(3000)

    //Check created event is showing
    cy.contains('[data-cy="event-name"]', 'Name only event by user1 for year 2024').should('be.visible')
    // cy.get('.action-email').should('have.value', 'fake@email.com')
    
  })

  it('Create event with name only for year 2025', () => { 

    // Click on add event floating button as a personal account
    cy.get('[data-cy="add-event-btn"]').click()

    // Should be on a new URL which is
    cy.url().should('include', '/events/store')
    cy.get('[data-cy="name"]').should('be.visible')

    //add event name and submit
    cy.get('[data-cy="name"]').type('Name only event by user1 for year 2025')
    cy.get('.cy-datapicker').eq(0).type('20/07/2025')
    cy.get('[data-cy="submit"]').click()

    //Should be back to 
    cy.url().should('include', '/events')
    cy.wait(3000)

    //Check created event is showing
    cy.contains('[data-cy="event-name"]', 'Name only event by user1 for year 2025').should('be.visible')
    // cy.get('.action-email').should('have.value', 'fake@email.com')
    
  })

  /**
   * Create business called "business one"
   */

  it('create a business called -  business one', () => {
    
    cy.get('[data-cy="link-create-business"]').click();
    cy.get('[data-cy="btn-create-business"]').click();

    cy.get('[data-cy="input-business-name"]').type("business one")
    cy.get('[data-cy="submit"]').click();

    //Check business card is shown
    cy.get('[data-cy="business-name"]').should('contain','business one')
  })


  /**Adding a new event for recently created business for year 2024 */
  it('create a event for business one - year 2024', () => {
    // Select business one from top bar menu
    cy.get('[data-cy="business-selector"]').click();
    cy.get('[data-cy="available-businesses"]').contains('h2', 'business one').click();

    //select plus button to add event
    cy.wait(2000)
    cy.get('[data-cy="add-event-btn"]').click()

    // Should be on a new URL which is
    cy.url().should('include', '/events/store')
    cy.get('[data-cy="name"]').should('be.visible')

    //add event name and submit
    cy.get('[data-cy="name"]').type('Event for business one - year 2024')
    cy.get('.cy-datapicker').eq(0).type('20/07/2024')
    cy.get('[data-cy="submit"]').click()

    //Should be back to 
    cy.url().should('include', '/events')
    cy.wait(3000)

    //Check created event is showing
    cy.contains('[data-cy="event-name"]', 'Event for business one - year 2024').should('be.visible')

  })

  /**Adding a new event for recently created business for year 2025 */
  it('create a event for business one - year 2025', () => {
    // Select business one from top bar menu
    cy.get('[data-cy="business-selector"]').click();
    cy.get('[data-cy="available-businesses"]').contains('h2', 'business one').click();

    //select plus button to add event
    cy.wait(2000)
    cy.get('[data-cy="add-event-btn"]').click()

    // Should be on a new URL which is
    cy.url().should('include', '/events/store')
    cy.get('[data-cy="name"]').should('be.visible')

    //add event name and submit
    cy.get('[data-cy="name"]').type('Event for business one - year 2025')
    cy.get('.cy-datapicker').eq(0).type('20/07/2025')
    cy.get('[data-cy="submit"]').click()

    //Should be back to 
    cy.url().should('include', '/events')
    cy.wait(3000)

    //Check created event is showing
    cy.contains('[data-cy="event-name"]', 'Event for business one - year 2025').should('be.visible')
  })

  /**full event details event created only for 2024. No use of creating another */
  it('create event with all data for year 2024', () => {
    
    // Click on add event floating button as a personal account
    cy.get('[data-cy="add-event-btn"]').click()

    // Should be on a new URL which is
    cy.url().should('include', '/events/store')
    cy.get('[data-cy="name"]').should('be.visible')

    
    cy.get('[data-cy="name"]').type('Event with full detail - user1')
    cy.get('[data-cy="description"]').type('user1 description')
    cy.get('[data-cy="telephone_1"]').type('0711230717')
    cy.get('[data-cy="telephone_2"]').type('0711230718')

    cy.get('[data-cy="cost"]').type('25000')

    //Click deposit button open deposit modal
    cy.get('[data-cy="btn-add-deposit"]').click()
    cy.get('[data-cy="input-deposit"]').type('10000')
    cy.get('.cy-datapicker').eq(0).type('05/06/2024')
    //Add event date and time
    
    cy.get('.cy-datapicker').eq(1).type('20/07/2024')

    cy.get('.cy-time-picker').eq(0).type('08:30 AM')
    cy.get('.cy-time-picker').eq(1).type('02:30 PM')
    cy.get('[data-cy="submit"]').click()

    // Should be on a new URL which is
    cy.url().should('include', '/events')
     
     
    cy.wait(3000)
     //Now check event name and start time and end times are correct.
    cy.contains('[data-cy="event-name"]', 'Event with full detail - user1').should('be.visible')
    cy.contains('[data-cy="event-times"]', '08:30 AM - 02:30 PM').should('be.visible')
     
  })

})