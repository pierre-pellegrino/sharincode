const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
  },
  defaultNS: "common",
  ns: [
    "common",
    "forgotten_pwd",
    "search",
    "comments",
    "profile",
    "register",
    "login",
    "forms",
    "post-editor",
    "edit-email",
    "edit-pwd",
    "edit-profile",
  ],
  reloadOnPrerender: true,
};
