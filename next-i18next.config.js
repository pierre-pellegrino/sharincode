const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
  },
  defaultNS: "common",
  ns: ["common", "forgotten_pwd", "search"],
  reloadOnPrerender: true,
};
