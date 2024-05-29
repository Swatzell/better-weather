describe('template spec', () => {
  it('should let the user know if theres a 400 level error', () => {
    cy.intercept("GET", 'https://api.openweathermap.org/data/3.0/onecall?lat=39.7392&lon=-104.9903&exclude=minutely&appid=b6c20e33c539bc3bf6a4cd3dcc54e835&units=imperial', {
      statusCode: 400, 
      fixture: 'api-mock-weather.json'
      });

    cy.visit('http://localhost:3000/');
    cy.get('.city-selector').select('Denver').should('have.value', 'Denver');

    cy.get('button').contains('See your Recommendations!').click();
    cy.get('h1').should('contain', 'Error 400');
    cy.get('p').should('contain', 'Sorry! An unexpected error occurred');
  });

  it('should let the user know if theres a 500 level error', () => {
    cy.intercept("GET", 'https://api.openweathermap.org/data/3.0/onecall?lat=39.7392&lon=-104.9903&exclude=minutely&appid=b6c20e33c539bc3bf6a4cd3dcc54e835&units=imperial', {
      statusCode: 500, 
      fixture: 'api-mock-weather.json'
      });

    cy.visit('http://localhost:3000/');
    cy.get('.city-selector').select('Denver').should('have.value', 'Denver');

    cy.get('button').contains('See your Recommendations!').click();
    cy.get('h1').should('contain', '500 - Server Error');
    cy.get('p').should('contain', 'Sorry, something went wrong on our end. Please try again later.');
  });
 
  it('should let the user know if theres a 404 level error', () => {
    cy.intercept("GET", 'https://api.openweathermap.org/data/3.0/onecall?lat=39.7392&lon=-104.9903&exclude=minutely&appid=b6c20e33c539bc3bf6a4cd3dcc54e835&units=imperial', {
      statusCode: 404, 
      fixture: 'api-mock-weather.json'
      });

    cy.visit('http://localhost:3000/');
    cy.get('.city-selector').select('Denver').should('have.value', 'Denver');

    cy.get('button').contains('See your Recommendations!').click();
    cy.get('h1').should('contain', '404 - Page Not Found');
    cy.get('p').should('contain', 'Sorry, the page you are looking for does not exist.');
  });
 
})