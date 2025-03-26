describe("Create Products", () => {
	it("should create a new product when all fields are valid", () => {
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

		cy.contains("[role='option']", "Canned Goods").click({ force: true });

		cy.get("[data-cy='category']").should("contain", "Canned Goods");

		cy.get('[data-cy="expiration-date"]').click();
		cy.get('[role="gridcell"]').first().click();

		cy.get('[data-cy="description"]')
			.type("Some description")
			.should("have.value", "Some description");

		cy.get("button[type='submit']").click();

		cy.contains("Product successfully created").should("be.visible");
	});

	it("should have an error when name field is empty", () => {
		cy.visit("http://localhost:3000/products/new");

		cy.get("[data-cy='name']");

		cy.get("[data-cy='price']")
			.clear()
			.type("45.50")
			.invoke("val")
			.then((value) => expect(value).to.equal("45.50"));

		cy.get("button[type='submit']").click();

		cy.get("[data-cy='name-error-message']")
			.should("be.visible")
			.and("include.text", "Please provide a product name");
	});

	it("should have an error when price field is empty", () => {
		cy.visit("http://localhost:3000/products/new");

		cy.get("[data-cy='name']")
			.type("Ajinomoto")
			.invoke("val")
			.then((value) => expect(value).to.equal("Ajinomoto"));

		cy.get('[data-cy="price"]');

		cy.get("button[type='submit']").click();

		cy.get("[data-cy='price-error-message']")
			.should("be.visible")
			.and("include.text", "Please provide a product price");
	});
});
