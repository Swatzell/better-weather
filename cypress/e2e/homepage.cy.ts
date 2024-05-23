describe('HomePage', () => {
  it('displays the webpage title, instructions, dropdown menu, and submission button', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('h1', "Better Weather");
    cy.contains('h2', 'Input your location to get clothing recommendations for today!!!');
    cy.contains('p', 'Have you ever looked at the weather for the day and wondered “What in the world do I wear??” Well then this webpage is for you!!');

    cy.get('label').contains('choose your location');
    cy.get('.city-selector').within(() => {
      cy.contains('option', 'Denver, CO');
      cy.contains('option', 'El Paso, TX');
      cy.contains('option', 'Chicago, IL');
      cy.contains('option', 'Birmingham, AL');
    });

    cy.get('.city-selector').select('Denver').should('have.value', 'Denver');

    cy.get('button').contains('See your Recommendations!');
  });
});