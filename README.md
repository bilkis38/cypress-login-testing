# Tugas 8 - Praktik Automation Testing (1)

Modul SWQA - SAKTI

Automation testing menggunakan Cypress untuk menguji aplikasi HRM **OrangeHRM Demo**
(`https://opensource-demo.orangehrmlive.com/`), mengacu pada skenario-skenario yang
telah dibuat pada laporan Manual Testing sebelumnya.

## Cakupan Skenario

Laporan manual testing yang menjadi acuan mencakup pengujian lintas modul dalam sistem
HRM (Login, Dashboard, Admin, PIM, Leave, Maintenance, Logout) — bukan hanya modul
login. Oleh karena itu, meskipun file spec ini bernama `login_spec.cy.js`, isinya
mencakup seluruh alur autentikasi dan modul-modul terkait, sesuai skenario asli pada
laporan manual testing.

## Struktur Project

tugas8-cypress-login-testing/
├── cypress/
│ ├── e2e/
│ │ └── auth/
│ │ └── login_spec.cy.js
│ └── support/
│ ├── commands.js
│ └── e2e.js
├── cypress.config.js
├── package.json
└── mochawesome-report/

## Instalasi

```bash
npm install
```

## Menjalankan Test

Mode headless (CLI) sekaligus generate laporan HTML:

```bash
npx cypress run
```

Mode interaktif (Test Runner UI):

```bash
npx cypress open
```

## Melihat Laporan

Setelah eksekusi selesai, buka:

mochawesome-report/index.html

## Ringkasan Test Case

**A. System Testing (8 test case):**

- TS-001 — Login dengan akun valid
- TS-002 — Login dengan password salah
- TS-003 — Login tanpa mengisi username & password
- TS-004 — Dashboard menampilkan seluruh widget setelah login
- TS-010 — Menyimpan data pegawai baru tanpa mengisi nama (PIM)
- TS-022 — Logout dari sistem
- TS-013 — Mengajukan cuti tanpa memilih tanggal (Leave)
- TS-021 — Verifikasi password sebelum akses menu Maintenance

**B. E2E Testing (5 test case):**

- E2E-001 — Login berhasil dan diarahkan ke Dashboard
- E2E-002 — Menampilkan seluruh informasi Dashboard setelah login
- E2E-003 — Admin menambahkan pegawai baru dan memverifikasi data tersimpan
- E2E-017 — Mengakses modul My Info melalui menu navigasi Dashboard
- E2E-018 — Logout setelah seluruh proses bisnis selesai

## Catatan Implementasi

- **CSS Selector**: seluruh locator memakai atribut `name`, `class`, `type`, dan `placeholder` bawaan aplikasi.
- **XPath (opsional)**: plugin `cypress-xpath` sudah terpasang, siap diaktifkan lewat `cypress/support/e2e.js`.
- **Wait Strategy**: tidak ada `cy.wait(ms)` statis di manapun. Seluruh interaksi memanfaatkan Automatic Waiting & Retry-ability bawaan Cypress.
- **Assertion**: kombinasi Equality Assertion, Visibility Assertion, dan State Assertion.
- **Reporting**: menggunakan `cypress-mochawesome-reporter`, menghasilkan laporan HTML lengkap dengan chart pass/fail dan durasi per test case.

## Hasil Eksekusi Terakhir

13 test cases — **13 passing, 0 failing**

## Ringkasan Test Case

**A. System Testing (8 test case):**

- TS-001 — Login dengan akun valid
- TS-002 — Login dengan password salah
- TS-003 — Login tanpa mengisi username & password
- TS-004 — Dashboard menampilkan seluruh widget setelah login
- TS-010 — Menyimpan data pegawai baru tanpa mengisi nama (PIM)
- TS-022 — Logout dari sistem
- TS-013 — Mengajukan cuti tanpa memilih tanggal (Leave)
- TS-021 — Verifikasi password sebelum akses menu Maintenance

**B. E2E Testing (5 test case):**

- E2E-001 — Login berhasil dan diarahkan ke Dashboard
- E2E-002 — Menampilkan seluruh informasi Dashboard setelah login
- E2E-003 — Admin menambahkan pegawai baru dan memverifikasi data tersimpan
- E2E-017 — Mengakses modul My Info melalui menu navigasi Dashboard
- E2E-018 — Logout setelah seluruh proses bisnis selesai

## Catatan Implementasi

- **CSS Selector**: seluruh locator memakai atribut `name`, `class`, `type`, dan `placeholder` bawaan aplikasi.
- **XPath (opsional)**: plugin `cypress-xpath` sudah terpasang, siap diaktifkan lewat `cypress/support/e2e.js`.
- **Wait Strategy**: tidak ada `cy.wait(ms)` statis di manapun. Seluruh interaksi memanfaatkan Automatic Waiting & Retry-ability bawaan Cypress.
- **Assertion**: kombinasi Equality Assertion, Visibility Assertion, dan State Assertion.
- **Reporting**: menggunakan `cypress-mochawesome-reporter`, menghasilkan laporan HTML lengkap dengan chart pass/fail dan durasi per test case.

## Hasil Eksekusi Terakhir

13 test cases — **13 passing, 0 failing**
