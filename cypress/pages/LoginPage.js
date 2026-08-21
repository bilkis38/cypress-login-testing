class LoginPage {
  visit() {
    cy.visit("/");
  }

  fillUsername(username) {
    cy.get('input[name="username"]').should("be.visible").type(username);
  }

  fillPassword(password) {
    cy.get('input[name="password"]').should("be.visible").type(password);
  }

  submit() {
    cy.get('button[type="submit"]').click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  getErrorMessage() {
    return cy.get(".oxd-alert-content-text");
  }

  getRequiredFieldError() {
    return cy
      .get(".oxd-input-group")
      .first()
      .find(".oxd-input-field-error-message");
  }
}

export default new LoginPage();
