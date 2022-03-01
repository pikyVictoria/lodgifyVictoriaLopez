import { loremIpsum } from "lorem-ipsum";

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


//On "Contact" page, add a test to verify that the field validations appear according to the following requirements. "Name" is mandatory and a message should be displayed in case this field is left empty "Phone number" is mandatory and a message should be displayed in case this field is left empty "Email address" is mandatory and a message should be displayed in case this field is left empty "Comment" is mandatory and a message should be displayed in case this field is left empty This test should pick the date of arrival "April 14th" and date of departure "June 14" to verify the datepicker is working as expected. This test should also add a random Lorem Ipsum of your choice to "Comment" field
context('Lodgify contact page', () => {
  it('Fill dates and comment and verify mandatory fields', () => {
    cy.visit('/contact.html')
    cy.title().should('include', 'Contact')

    //This test should pick the date of arrival "April 14th" and date of departure "June 14" to verify the datepicker is working as expected
    cy.get('.DateRangePickerInput_calendarIcon.DateRangePickerInput_calendarIcon_1').click()
    cy.get('.DayPickerNavigation_svg__horizontal.DayPickerNavigation_svg__horizontal_1').eq(1).click()

    //Check that month is April and select 'April 14th'
    cy.get('.CalendarMonth_caption.CalendarMonth_caption_1').contains('April 2022')
    cy.get('[aria-label="Thursday, April 14, 2022"]').click()

    //Check that month is June and select 'June 14th'
    cy.get('.DayPickerNavigation_svg__horizontal.DayPickerNavigation_svg__horizontal_1').eq(1).click()
    cy.get('.DayPickerNavigation_svg__horizontal.DayPickerNavigation_svg__horizontal_1').eq(1).click()
    cy.get('.CalendarMonth_caption.CalendarMonth_caption_1').contains('June 2022')
    cy.get('[aria-label="Tuesday, June 14, 2022"]').click()

    //This test should also add a random Lorem Ipsum of your choice to "Comment" field
    cy.get('[placeholder="Comment"]').type(loremIpsum())

    //Click on 'Send' button to verify that field validations appears according to requirements
    cy.scrollTo('bottom')
    cy.get('.ui.circular.right.floated.button').click()

    //"Name" is mandatory and a message should be displayed in case this field is left empty
    cy.get('.ui.red.pointing.below.label').contains('Name is mandatory')

    //"Phone number" is mandatory and a message should be displayed in case this field is left empty
    cy.get('.ui.red.pointing.below.label').contains('Phone number is mandatory')

    //"Email address" is mandatory and a message should be displayed in case this field is left empty
    cy.get('.ui.red.pointing.below.label').contains('Email is mandatory')
  });
})


//Using your own criteria, add tests according to what you think should be important to cover in this page "Contact". (Optional)
//Do not fill any field in the contact form and verify that warning for mandatory fields appears
context('Lodgify contact page', () => {
  it('Do not fill any field and verify mandatory fields', () => {
    cy.visit('/contact.html')
    cy.title().should('include', 'Contact')

    //Click on 'Send' button to verify that field validations appears according to requirements
    cy.scrollTo('bottom')
    cy.get('.ui.circular.right.floated.button').click()

    //"Name" is mandatory and a message should be displayed in case this field is left empty
    cy.get('.ui.red.pointing.below.label').contains('Name is mandatory')

    //"Phone number" is mandatory and a message should be displayed in case this field is left empty
    cy.get('.ui.red.pointing.below.label').contains('Phone number is mandatory')

    //"Email address" is mandatory and a message should be displayed in case this field is left empty
    cy.get('.ui.red.pointing.below.label').contains('Email is mandatory')

    //"Comment" is mandatory and a message should be displayed in case this field is left empty
    cy.get('.ui.red.pointing.below.label').contains('Comment is mandatory')

  });
})

//Fill all the fields with valid data
context('Lodgify contact page', () => {
  it('Fill all fields and send form', () => {
    cy.visit('/contact.html')
    cy.title().should('include', 'Contact')

    //Write a valid name
    cy.get('[name="name"]').type("Test Victoria")

    //Write a valid phone number
    cy.get('.PhoneInputInput').type("666002244")

    //Write a valid email
    cy.get('[name="email"]').type("victoria.test@mail.com")

    //Select 5 guests
    cy.get('[name="guests"]').type("5")

    //Select the date of arrival "April 14th" and date of departure "June 14" to verify the datepicker is working as expected
    cy.get('.DateRangePickerInput_calendarIcon.DateRangePickerInput_calendarIcon_1').click()
    cy.get('.DayPickerNavigation_svg__horizontal.DayPickerNavigation_svg__horizontal_1').eq(1).click()
    cy.get('.CalendarMonth_caption.CalendarMonth_caption_1').contains('April 2022')
    cy.get('[aria-label="Thursday, April 14, 2022"]').click()
    cy.get('.DayPickerNavigation_svg__horizontal.DayPickerNavigation_svg__horizontal_1').eq(1).click()
    cy.get('.DayPickerNavigation_svg__horizontal.DayPickerNavigation_svg__horizontal_1').eq(1).click()
    cy.get('.CalendarMonth_caption.CalendarMonth_caption_1').contains('June 2022')
    cy.get('[aria-label="Tuesday, June 14, 2022"]').click()

    //This test should also add a random Lorem Ipsum of your choice to "Comment" field
    cy.get('[placeholder="Comment"]').type(loremIpsum())

    //Click on 'Send' button to verify that field validations appears according to requirements
    cy.scrollTo('bottom')
    cy.get('.ui.circular.right.floated.button').click()

    //Check that request has been send
    cy.contains('Your request has been sent successfully.')
  });
})


//Fill all the fields with only one valid data for arrival nor for departure
context('Lodgify contact page', () => {
  it('Fill with wrong data', () => {
    cy.visit('/contact.html')
    cy.title().should('include', 'Contact')

    //Write a valid name
    cy.get('[name="name"]').type("Test Victoria")

    //Write a valid phone number
    cy.get('.PhoneInputInput').type("666002244")

    //Write a valid email
    cy.get('[name="email"]').type("victoria.test@mail.com")

    //Select 5 guests
    cy.get('[name="guests"]').type("5")

    //Select the date of arrival "April 14th" and date of departure "March 18th"
    cy.get('.DateRangePickerInput_calendarIcon.DateRangePickerInput_calendarIcon_1').click()
    cy.get('.DayPickerNavigation_svg__horizontal.DayPickerNavigation_svg__horizontal_1').eq(1).click()
    cy.get('[aria-label="Thursday, April 14, 2022"]').click()
    cy.get('[name="name"]').click({force: true})

    //Dates are not valid
    cy.get('.ui.red.pointing.below.label').contains('Dates are not valid')

    //Write a random Lorem Ipsum comment
    cy.get('[placeholder="Comment"]').type(loremIpsum())
  });
})
