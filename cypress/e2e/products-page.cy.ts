describe("Products Page", () => {
	it("should validate all table columns", () => {
		cy.visit("http://localhost:3000/products");

		cy.get("h1").should("have.text", "Products");

		cy.get('[data-cy-header="ID"]')
			.should("be.visible")
			.and("include.text", "ID");
		cy.get('[data-cy-header="Name"]')
			.should("be.visible")
			.and("include.text", "Name");
		cy.get('[data-cy-header="Price"]')
			.should("be.visible")
			.and("include.text", "Price");
		cy.get('[data-cy-header="Description"]')
			.should("be.visible")
			.and("include.text", "Description");
		cy.get('[data-cy-header="Category"]')
			.should("be.visible")
			.and("include.text", "Category");
		cy.get('[data-cy-header="Date Created"]')
			.should("be.visible")
			.and("include.text", "Date Created");
		cy.get('[data-cy-header="Expiration Date"]')
			.should("be.visible")
			.and("include.text", "Expiration Date");
	});
});
