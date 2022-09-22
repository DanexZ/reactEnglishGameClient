describe("User can to register", () => {

    it("User can go to register screen and there is a register form" , () => {

        //User visits the page
        cy.visit("http://localhost:3000");

        //User goes to Register Screen
        cy.get('li')
            .should('have.length', 2)
            .last()
            .should('have.text', "Register")
            .click()

        //Is there a register form?
        cy.get("input")
            .should("have.length", 5)
            .last()
            .should("have.value", "Rejestruj")

    });

    it("User can't send empty form", () => {

        cy.get('input')
            .eq(1) 
            .type(" ");

        cy.get('input')
            .eq(2) 
            .type(" ");

        cy.get('input')
            .eq(3) 
            .type(" ");

        cy.get('input')
            .eq(4) 
            .type(" ");

        cy.get('input[type=submit]')
            .click();

        cy.contains('Możesz teraz się zalogować').should('not.exist');

        
    })

    
});