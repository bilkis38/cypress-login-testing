class DashboardPage {
  getHeaderModule() {
    return cy.get(".oxd-topbar-header-breadcrumb-module");
  }

  navigateToMenu(menuName) {
    cy.contains(".oxd-main-menu-item", menuName).click();
  }

  clickAdd() {
    cy.contains("button", "Add").click();
  }

  clickSave() {
    cy.contains("button", "Save").click();
  }

  getRequiredFieldError() {
    return cy.get(".oxd-input-field-error-message");
  }

  logout() {
    cy.get(".oxd-userdropdown-tab").click();
    cy.contains("a", "Logout").click();
  }
}

export default new DashboardPage();
