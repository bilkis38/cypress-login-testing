import LoginPage from "../../pages/LoginPage";
import DashboardPage from "../../pages/DashboardPage";

describe("System Testing - HRM OrangeHRM", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("TS-001 - Login dengan akun valid", () => {
    LoginPage.login("Admin", "admin123");

    cy.url().should("include", "/dashboard/index");
    DashboardPage.getHeaderModule()
      .should("be.visible")
      .and("contain.text", "Dashboard");
  });

  it("TS-002 - Login dengan password salah", () => {
    LoginPage.login("Admin", "salah123");

    cy.url().should("include", "/auth/login");
    LoginPage.getErrorMessage()
      .should("be.visible")
      .and("contain.text", "Invalid credentials");
  });

  it("TS-003 - Login tanpa mengisi username dan password", () => {
    LoginPage.submit();

    LoginPage.getRequiredFieldError()
      .should("be.visible")
      .and("contain.text", "Required");
  });

  it("TS-004 - Dashboard menampilkan seluruh widget setelah login", () => {
    LoginPage.login("Admin", "admin123");
    cy.url().should("include", "/dashboard/index");

    cy.get(".oxd-grid-item")
      .should("have.length.greaterThan", 0)
      .and("be.visible");
    cy.contains(".oxd-text", "Time at Work").should("be.visible");
    cy.contains(".oxd-text", "Quick Launch").should("be.visible");
  });

  it("TS-010 - Menyimpan data pegawai baru tanpa mengisi nama (PIM)", () => {
    LoginPage.login("Admin", "admin123");
    cy.url().should("include", "/dashboard/index");

    DashboardPage.navigateToMenu("PIM");
    cy.url().should("include", "/pim/viewEmployeeList");

    DashboardPage.clickAdd();
    cy.url().should("include", "/pim/addEmployee");

    DashboardPage.clickSave();
    DashboardPage.getRequiredFieldError()
      .should("be.visible")
      .and("contain.text", "Required");
  });

  it("TS-022 - Logout dari sistem", () => {
    LoginPage.login("Admin", "admin123");
    cy.url().should("include", "/dashboard/index");

    DashboardPage.logout();

    cy.url().should("include", "/auth/login");
    cy.get('input[name="username"]').should("be.visible");
  });

  it("TS-013 - Mengajukan cuti tanpa memilih tanggal (Leave)", () => {
    LoginPage.login("Admin", "admin123");
    cy.url().should("include", "/dashboard/index");

    DashboardPage.navigateToMenu("Leave");
    cy.url().should("include", "/leave/");

    cy.contains(".oxd-topbar-body-nav-tab", "Apply").click();
    cy.url().should("include", "/leave/");

    cy.get('button[type="submit"]').should("be.visible").click({ force: true });
    cy.contains("Required").should("be.visible");
  });

  it("TS-021 - Verifikasi password sebelum akses menu Maintenance", () => {
    LoginPage.login("Admin", "admin123");
    cy.url().should("include", "/dashboard/index");

    DashboardPage.navigateToMenu("Maintenance");
    cy.url().should("include", "/maintenance/");

    cy.get('input[type="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.url().should("not.include", "/maintenance/validatePassword");
    cy.get('input[type="password"]').should("not.exist");
  });
});
