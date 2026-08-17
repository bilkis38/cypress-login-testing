// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Abaikan uncaught exception dari aplikasi (bukan dari test kita),
// supaya test tidak gagal karena bug internal di sisi aplikasi target.
Cypress.on("uncaught:exception", (err) => {
  return false;
});

// Registrasi cypress-mochawesome-reporter agar screenshot ter-embed di laporan HTML
require("cypress-mochawesome-reporter/register");

// OPTIONAL: aktifkan dukungan XPath (selain CSS Selector)
require("cypress-xpath");
