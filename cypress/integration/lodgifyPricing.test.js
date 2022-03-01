Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

//1. On "Lodgify Pricing" page, add a test to verify that the "Yearly" plan selecting 50 rentals displays: $64 for Starter plan $375 for Professional plan $525 for Ultimate plan
context('Lodgify pricing page', () => {
  it('Verify Yearly plan', () => {
    cy.visit('/pricing.html')

    //Select 50 rentals
    cy.get('#scroll-prop-plan').clear()
    cy.get('#scroll-prop-plan').type('50')

    //Verify that Starter plan is $64
    cy.get('.col-auto.price-card-starter').contains('$64')

    //Verify that Professional plan is $375
    cy.xpath('//div[@class="col-auto price-card-pro"][1]/div/div/h6[@class="plan-name"]').contains('Professional')
    cy.get('.plan-price.plan-price-1.btn-price-plan-prof.text-dark').contains('$375')

    //Verify that Ultimate plan is $525
    cy.xpath('//div[@class="col-auto price-card-pro"][2]/div/div/h6[@class="plan-name"]').contains('Ultimate')
    cy.get('.plan-price.plan-price-3.btn-price-plan-prof.text-dark').contains('$525')
  });
})


//2. On "Lodgify Pricing" page, add a test to verify that the change of currency (located just below the pricing options) properly changes the currency of the pricing options. The way you do so, and the extra verification steps are up to you (such as verifying the currency price difference)
context('Lodgify pricing page', () => {
  it('Verify the currency of the pricing options', () => {
    cy.visit('/pricing.html')

    //Read 'fixtures/pricing.json' to get all data for each currency and then, change the currency and verify that all planes has its proper value
    cy.fixture('pricing').then((data) => {
        for (var index in data){
            cy.get('.price-currency-select.form-control.input-sm.form-control-bord-round').select(data[index].currency).should('have.value', data[index].value)
            cy.wait(1000)
            cy.get('.col-auto.price-card-starter').contains(data[index].starter)
            cy.get('.plan-price.plan-price-1.btn-price-plan-prof.text-dark').contains(data[index].professional)
            cy.get('.plan-price.plan-price-3.btn-price-plan-prof.text-dark').contains(data[index].ultimate)
        }
    })
  });
})

//3. Using your own criteria, add tests according to what you think should be important to cover in this page "Lodgify Pricing". (Optional)
//Verify if you set a not valid number of rentals (zero) the default value is changed to 1 rental
context('Lodgify pricing page', () => {
  it('Verify number of rentals', () => {
    cy.visit('/pricing.html')

    //Select 0 rentals
    cy.get('#scroll-prop-plan').clear()
    cy.get('#scroll-prop-plan').type('0')

    //Verify that value is set to default 1 rentals
    cy.get('#scroll-prop-plan').should('have.value', '1')
  });
})

//Verify if you set a not valid number of rentals (more than 100) the value is changed up to 100 rentals
context('Lodgify pricing page', () => {
  it('Verify maximum number of rentals', () => {
    cy.visit('/pricing.html')

    //Select 1000 rentals
    cy.get('#scroll-prop-plan').clear()
    cy.get('#scroll-prop-plan').type('1000')

    //Verify that value is set to maximum 100 rentals
    cy.get('#scroll-prop-plan').should('have.value', '100')
  });
})
