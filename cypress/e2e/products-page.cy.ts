describe("template spec", () => {
	it("", () => {
		cy.visit("http://localhost:3000/products");

		cy.get("h1").should("have.text", "Products");

		cy.get('[data-header="ID"]').should("be.visible").and("include.text", "ID");
		cy.get('[data-header="Name"]')
			.should("be.visible")
			.and("include.text", "Name");
		cy.get('[data-header="Price"]')
			.should("be.visible")
			.and("include.text", "Price");

		cy.get('[data-header="Category"]')
			.should("be.visible")
			.and("include.text", "Category");
		cy.get('[data-header="Date Created"]')
			.should("be.visible")
			.and("include.text", "Date Created");
	});
});
