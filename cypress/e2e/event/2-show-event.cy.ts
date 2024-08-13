describe('Checking user1 added event information', () => {
  beforeEach( () => {
    cy.login('user1@gmail.com', '920720455')
  })

  it('checking name only event created for year 2024', () => { 
    //by default should be in events page.
    cy.url().should('include', '/events/2024')
    cy.wait(3000)
    
    //Select name only event
    cy.contains('[data-cy="event-name"]', 'Name only event by user1 for year 2024').click()
    //Opens the event show page
    cy.get('[data-cy="name"]').should('contain','Name only event by user1 for year 2024');
  })

  it('checking name only event created for year 2025', () => { 

     //by default should be in events page.
     cy.wait(3000)

     //Select year 2025
     cy.get('[data-cy="year-selector"]').click();
     cy.get('[data-cy="available-years"]').contains('a', '2025').click();
     
     //Check selected year is in URL
     cy.url().should('include', '/events/2025')

     //Select name only event
     cy.contains('[data-cy="event-name"]', 'Name only event by user1 for year 2025').click()
     //Opens the event show page
     cy.get('[data-cy="name"]').should('contain','Name only event by user1 for year 2025');

    
  })

  it('checking name only event created for year 2024 -business one', () => { 
    //by default should be in events page after login
    cy.url().should('include', '/events/2024')
    cy.wait(3000)

    // Select `business one` from top bar menu
    cy.get('[data-cy="business-selector"]').click();
    cy.get('[data-cy="available-businesses"]').contains('h2', 'business one').click();

    // Select year `2024`
    cy.get('[data-cy="year-selector"]').click();
    cy.get('[data-cy="available-years"]').contains('a', '2024').click();


    //Select name only event
    cy.contains('[data-cy="event-name"]', 'Event for business one - year 2024').click()
    //Opens the event show page
    cy.get('[data-cy="name"]').should('contain','Event for business one - year 2024');

  })

  it('checking name only event created for year 2025 -business one', () => { 
    //by default should be in events page after login
    cy.wait(3000)

    // Select `business one` from top bar menu
    cy.get('[data-cy="business-selector"]').click();
    cy.get('[data-cy="available-businesses"]').contains('h2', 'business one').click();

    // Select year `2024`
    cy.get('[data-cy="year-selector"]').click();
    cy.get('[data-cy="available-years"]').contains('a', '2025').click();

    //Check selected year available in URL
    cy.url().should('include', '/events/2025')

    //Select name only event
    cy.contains('[data-cy="event-name"]', 'Event for business one - year 2025').click()
    //Opens the event show page
    cy.get('[data-cy="name"]').should('contain','Event for business one - year 2025');
  })

  it('checking full detail event', () => { 
    //by default should be in events page.
    cy.url().should('include', '/events/2024')
    cy.wait(3000)

    //select full detail event
    cy.contains('[data-cy="event-name"]', 'Event with full detail - user1').click()
    cy.url().should('contain', '/events/show')
    cy.wait(2000)
    cy.get('[data-cy="name"]').should('contain','Event with full detail - user1');
    cy.get('[data-cy="description"]').should('contain','user1 description');

    cy.get('[data-cy="from"]').should('contain','08:30 AM');
    cy.get('[data-cy="to"]').should('contain','02:30 PM');

    cy.get('[data-cy="telephone_1"]').should('contain',' 0711230717');
    cy.get('[data-cy="telephone_2"]').should('contain','0711230718');

    cy.get('[data-cy="cost"]').should('contain','25000');
    cy.get('[data-cy="balance"]').should('contain','15000');

    cy.get('[data-cy="deposits"]').should('contain','10000');
    cy.get('[data-cy="deposits-date"]').should('contain','2024-05-06');


  })

})