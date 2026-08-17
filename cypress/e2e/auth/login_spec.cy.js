describe("Tugas 8: Automation Testing - HRM OrangeHRM", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // =========================================================
  // A. SYSTEM TESTING
  // =========================================================

  describe("A. System Testing", () => {
    it("TS-001 - Login dengan akun valid", () => {
      cy.get('input[name="username"]').should("be.visible").type("Admin");
      cy.get('input[name="password"]').should("be.visible").type("admin123");
      cy.get('button[type="submit"]').click();

      // harus masuk ke dashboard
      cy.url().should("include", "/dashboard/index");
      cy.get(".oxd-topbar-header-breadcrumb-module")
        .should("be.visible")
        .and("contain.text", "Dashboard");
    });

    it("TS-002 - Login dengan password salah", () => {
      cy.get('input[name="username"]').type("Admin");
      cy.get('input[name="password"]').type("salah123");
      cy.get('button[type="submit"]').click();

      // masih di halaman login, ada pesan error
      cy.url().should("include", "/auth/login");
      cy.get(".oxd-alert-content-text")
        .should("be.visible")
        .and("contain.text", "Invalid credentials");
    });

    it("TS-003 - Login tanpa mengisi username dan password", () => {
      cy.get('button[type="submit"]').click();

      cy.get(".oxd-input-group")
        .first()
        .find(".oxd-input-field-error-message")
        .should("be.visible")
        .and("contain.text", "Required");
    });

    it("TS-004 - Dashboard menampilkan seluruh widget setelah login", () => {
      cy.get('input[name="username"]').type("Admin");
      cy.get('input[name="password"]').type("admin123");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/dashboard/index");

      cy.get(".oxd-grid-item")
        .should("have.length.greaterThan", 0)
        .and("be.visible");

      // spot check 2 widget yang pasti selalu ada
      cy.contains(".oxd-text", "Time at Work").should("be.visible");
      cy.contains(".oxd-text", "Quick Launch").should("be.visible");
    });

    it("TS-010 - Menyimpan data pegawai baru tanpa mengisi nama (PIM)", () => {
      cy.get('input[name="username"]').type("Admin");
      cy.get('input[name="password"]').type("admin123");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/dashboard/index");

      cy.contains(".oxd-main-menu-item", "PIM").click();
      cy.url().should("include", "/pim/viewEmployeeList");

      cy.contains("button", "Add").click();
      cy.url().should("include", "/pim/addEmployee");

      // langsung save tanpa isi nama, buat mancing validasi
      cy.contains("button", "Save").click();

      cy.get(".oxd-input-field-error-message")
        .should("be.visible")
        .and("contain.text", "Required");
    });

    it("TS-022 - Logout dari sistem", () => {
      cy.get('input[name="username"]').type("Admin");
      cy.get('input[name="password"]').type("admin123");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/dashboard/index");

      cy.get(".oxd-userdropdown-tab").click();
      cy.contains("a", "Logout").click();

      cy.url().should("include", "/auth/login");
      cy.get('input[name="username"]').should("be.visible");
    });

    it("TS-013 - Mengajukan cuti tanpa memilih tanggal (Leave)", () => {
      cy.get('input[name="username"]').type("Admin");
      cy.get('input[name="password"]').type("admin123");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/dashboard/index");

      cy.contains(".oxd-main-menu-item", "Leave").click();
      cy.url().should("include", "/leave/");

      cy.contains(".oxd-topbar-body-nav-tab", "Apply").click();
      cy.url().should("include", "/leave/");

      // submit kosong buat cek validasi field wajib
      cy.contains("button", "Apply").click();

      cy.get(".oxd-input-field-error-message")
        .should("be.visible")
        .and("contain.text", "Required");
    });

    it("TS-021 - Verifikasi password sebelum akses menu Maintenance", () => {
      cy.get('input[name="username"]').type("Admin");
      cy.get('input[name="password"]').type("admin123");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/dashboard/index");

      cy.contains(".oxd-main-menu-item", "Maintenance").click();
      cy.url().should("include", "/maintenance/");

      cy.get('input[type="password"]').type("admin123");
      cy.get('button[type="submit"]').click();

      // halaman verifikasi harus sudah kelewat, form password ilang
      cy.url().should("not.include", "/maintenance/validatePassword");
      cy.get('input[type="password"]').should("not.exist");
    });
  });

  // =========================================================
  // B. E2E TESTING
  // =========================================================
  describe("B. E2E Testing", () => {
    it("E2E-001 - Login berhasil dan diarahkan ke Dashboard", () => {
      cy.get('input[name="username"]').type("Admin");
      cy.get('input[name="password"]').type("admin123");
      cy.get('button[type="submit"]').click();

      cy.url().should("include", "/dashboard/index");
      cy.get(".oxd-topbar-header-breadcrumb-module")
        .should("be.visible")
        .and("contain.text", "Dashboard");
    });

    it("E2E-002 - Menampilkan seluruh informasi Dashboard setelah login", () => {
      cy.get('input[name="username"]').type("Admin");
      cy.get('input[name="password"]').type("admin123");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/dashboard/index");

      cy.contains(".oxd-text", "Time at Work").should("be.visible");
      cy.contains(".oxd-text", "My Actions").should("be.visible");
      cy.contains(".oxd-text", "Quick Launch").should("be.visible");
      cy.contains(".oxd-text", "Buzz Latest Posts").should("be.visible");
    });

    it("E2E-003 - Admin menambahkan pegawai baru dan memverifikasi data tersimpan", () => {
      const firstName = "Ahmad";
      const lastName = "Wijaya" + Date.now();

      cy.get('input[name="username"]').type("Admin");
      cy.get('input[name="password"]').type("admin123");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/dashboard/index");

      cy.contains(".oxd-main-menu-item", "PIM").click();
      cy.url().should("include", "/pim/viewEmployeeList");

      cy.contains("button", "Add").click();
      cy.url().should("include", "/pim/addEmployee");

      cy.get('input[placeholder="First Name"]').type(firstName);
      cy.get('input[placeholder="Last Name"]').type(lastName);
      cy.contains("button", "Save").click();

      // kalau kesimpan, harusnya lempar ke halaman detail pegawai
      cy.url().should("include", "/pim/viewPersonalDetails");
      cy.contains(firstName).should("be.visible");
      cy.contains(lastName).should("be.visible");
    });

    it("E2E-017 - Mengakses modul My Info melalui menu navigasi Dashboard", () => {
      cy.get('input[name="username"]').type("Admin");
      cy.get('input[name="password"]').type("admin123");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/dashboard/index");

      cy.contains(".oxd-main-menu-item", "My Info").click();

      cy.url().should("include", "/pim/viewPersonalDetails");
      cy.get(".oxd-topbar-header-breadcrumb-module")
        .should("be.visible")
        .and("contain.text", "PIM");
    });

    it("E2E-018 - Logout setelah seluruh proses bisnis selesai", () => {
      cy.get('input[name="username"]').type("Admin");
      cy.get('input[name="password"]').type("admin123");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/dashboard/index");

      cy.get(".oxd-userdropdown-tab").click();
      cy.contains("a", "Logout").click();

      cy.url().should("include", "/auth/login");
      cy.get('input[name="username"]').should("be.visible");
      cy.get('input[name="password"]').should("have.value", "");
    });
  });
});
