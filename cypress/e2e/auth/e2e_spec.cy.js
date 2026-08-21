import LoginPage from "../../pages/LoginPage";
import DashboardPage from "../../pages/DashboardPage";

describe("E2E Testing - HRM OrangeHRM", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("E2E-001 - Login berhasil dan diarahkan ke Dashboard", () => {
    LoginPage.login("Admin", "admin123");

    cy.url().should("include", "/dashboard/index");
    DashboardPage.getHeaderModule()
      .should("be.visible")
      .and("contain.text", "Dashboard");
  });

  it("E2E-002 - Menampilkan seluruh informasi Dashboard setelah login", () => {
    LoginPage.login("Admin", "admin123");
    cy.url().should("include", "/dashboard/index");

    cy.contains(".oxd-text", "Time at Work").should("be.visible");
    cy.contains(".oxd-text", "My Actions").should("be.visible");
    cy.contains(".oxd-text", "Quick Launch").should("be.visible");
    cy.contains(".oxd-text", "Buzz Latest Posts").should("be.visible");
  });

  it("E2E-003 - Admin menambahkan pegawai baru dan memverifikasi data tersimpan", () => {
    const firstName = "Ahmad";
    const lastName = "Wijaya" + Date.now();

    LoginPage.login("Admin", "admin123");
    cy.url().should("include", "/dashboard/index");

    DashboardPage.navigateToMenu("PIM");
    cy.url().should("include", "/pim/viewEmployeeList");

    DashboardPage.clickAdd();
    cy.url().should("include", "/pim/addEmployee");

    cy.get('input[placeholder="First Name"]').type(firstName);
    cy.get('input[placeholder="Last Name"]').type(lastName);
    DashboardPage.clickSave();

    cy.url().should("include", "/pim/viewPersonalDetails");
    cy.contains(firstName).should("be.visible");
    cy.contains(lastName).should("be.visible");
  });

  it("E2E-017 - Mengakses modul My Info melalui menu navigasi Dashboard", () => {
    LoginPage.login("Admin", "admin123");
    cy.url().should("include", "/dashboard/index");

    DashboardPage.navigateToMenu("My Info");

    cy.url().should("include", "/pim/viewPersonalDetails");
    DashboardPage.getHeaderModule()
      .should("be.visible")
      .and("contain.text", "PIM");
  });

  it("E2E-018 - Logout setelah seluruh proses bisnis selesai", () => {
    LoginPage.login("Admin", "admin123");
    cy.url().should("include", "/dashboard/index");

    DashboardPage.logout();

    cy.url().should("include", "/auth/login");
    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="password"]').should("have.value", "");
  });
});
