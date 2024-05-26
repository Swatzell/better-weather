describe('template spec', () => {
  beforeEach(() => {
    cy.intercept("GET", 'https://api.openweathermap.org/data/3.0/onecall?lat=39.7392&lon=-104.9903&exclude=minutely&appid=b6c20e33c539bc3bf6a4cd3dcc54e835&units=imperial', {
      statusCode: 200, 
      fixture: 'api-mock-weather.json'
      });
    })


  it('accurately displays temperature, precipitation, a summary, and clothing suggestions', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.city-selector').select('Denver').should('have.value', 'Denver');

    cy.get('button').contains('See your Recommendations!').click();

    cy.get('.weather-details').should('contain', 'Temperature: 48.51°F (9.17°C)')
    .should('contain', 'Precipitation: 0.58%')

    cy.get('.weather-description')
  });
})