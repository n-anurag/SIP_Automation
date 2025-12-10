Feature: Sample SIP login

  Scenario: SIP Payment
    Given I open the SIP login page
    When I login to SIP portal
    And I click on "sip_icon" button
    And I click on "sip_payment" button
    And I click on "checkbox" button
    And I click on "agree" button
    And I click on "checkbox_proceed" button 
    And I enter transaction pin
    And I click on "proceed" button 
    And I click on screen
    And I click on "esewa" button
    And I click on "proceed_payment_esewa" button
    And I fill the esewa payment details
    And I wait for manual captcha
   