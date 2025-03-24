describe("template spec", () => {
	it("", () => {
		cy.visit("http://localhost:3000/products");

		cy.get("h1").should("have.text", "Products");
	});
});
