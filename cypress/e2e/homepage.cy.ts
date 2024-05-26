describe('HomePage', () => {
  beforeEach(() => {
    cy.intercept("GET", 'https://api.openweathermap.org/data/3.0/onecall?lat=39.7392&lon=-104.9903&exclude=minutely&appid=b6c20e33c539bc3bf6a4cd3dcc54e835&units=imperial', {
      statusCode: 200, 
      fixture: 'api-mock-weather.json'
      });
    })

  it('displays the webpage title, instructions, dropdown menu, and submission button', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('h1', "Better Weather");
    cy.contains('h2', 'Input your location to get clothing recommendations for today!!!');
    cy.contains('p', 'Have you ever looked at the weather for the day and wondered "What in the world do I wear??" Well then this webpage is for you!!');

    cy.get('label').contains('Choose your location!');
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