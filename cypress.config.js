const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config),
      module.exports = {
        viewportWidth: 1280,
        viewportHeight: 800,
        //"chromeWebSecurity": false,
        "baseUrl": "https://barrigarest.wcaquino.me"
        //testIsolation: false
        // Outras configurações...
      }
      
    },
  },
})
