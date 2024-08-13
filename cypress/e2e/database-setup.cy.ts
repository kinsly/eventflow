describe('Preparing database', () => {

  it('enabling test database', () => { 
    //Remove all available data before starting the database
    cy.exec('php artisan db:wipe --env=testing').then(() => {
      //Create tables
      cy.exec('php artisan migrate --env=testing')
    }).then( () => {
      //Adding super admin 
      cy.exec('php artisan db:seed --env=testing')
    }).then( () => {
      //Adding default users for testing
      cy.exec('php artisan db:seed --class=TestUsersSeeder --env=testing')
    })
  })
})
