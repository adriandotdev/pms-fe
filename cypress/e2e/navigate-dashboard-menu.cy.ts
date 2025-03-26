describe("Dashboard Menus Tests", () => {
	it("should properly navigate to pages", () => {
		cy.visit("http://localhost:3000");

		cy.get('[data-cy-menu="Products"]').click();

		cy.url().should("include", "/products");

		cy.get('[data-cy-menu="Create Product"]').click();

		cy.url().should("include", "/new");
	});
});
