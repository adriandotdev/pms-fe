describe("template spec", () => {
	it("all fields are valid", () => {
		cy.visit("http://localhost:3000/products/new");

		cy.get("[data-cy='name']")
			.type("Ajinomoto")
			.invoke("val")
			.then((value) => expect(value).to.equal("Ajinomoto"));

		cy.get("[data-cy='price']")
			.clear()
			.type("45.50")
			.invoke("val")
			.then((value) => expect(value).to.equal("45.50"));

		cy.get("[data-cy='category']").click({ force: true });

		cy.contains("[role='option']", "Beverages").click({ force: true });

		cy.get("[data-cy='category']").should("contain", "Beverages");

		cy.get("button[type='submit']").click();

		cy.contains("Product successfully created").should("be.visible");
	});

	it("name field is empty", () => {
		cy.visit("http://localhost:3000/products/new");

		cy.get("[data-cy='name']");

		cy.get("[data-cy='price']")
			.clear()
			.type("45.50")
			.invoke("val")
			.then((value) => expect(value).to.equal("45.50"));

		cy.get("button[type='submit']").click();

		cy.get("[data-cy='name-error-message']").should("be.visible");
	});
});
