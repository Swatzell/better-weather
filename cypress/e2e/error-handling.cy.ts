describe('template spec', () => {
  it('should let the user know if theres a 400 level error', () => {
    cy.intercept("GET", 'https://api.openweathermap.org/data/3.0/onecall?lat=39.7392&lon=-104.9903&exclude=minutely&appid=b6c20e33c539bc3bf6a4cd3dcc54e835&units=imperial', {
      statusCode: 400, 
      fixture: 'api-mock-weather.json'
      });

    cy.visit('http://localhost:3000/');
    cy.get('.city-selector').select('Denver').should('have.value', 'Denver');

    cy.get('button').contains('See your Recommendations!').click();
      //currently ending on a click, needs a statement
  });

  it('should let the user know if theres a 400 level error', () => {
    cy.intercept("GET", 'https://api.openweathermap.org/data/3.0/onecall?lat=39.7392&lon=-104.9903&exclude=minutely&appid=b6c20e33c539bc3bf6a4cd3dcc54e835&units=imperial', {
      statusCode: 500, 
      fixture: 'api-mock-weather.json'
      });

    cy.visit('http://localhost:3000/');
    cy.get('.city-selector').select('Denver').should('have.value', 'Denver');

    cy.get('button').contains('See your Recommendations!').click();
      //currently ending on a click, needs a statement
  });
 

})