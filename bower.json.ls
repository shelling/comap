#!/usr/bin/env lsc -cj
name: "angular-livescript-seed"
repo: "clkao/angular-livescript-seed"
version: "0.0.1"
main: "_public/js/app.js"
ignore: ["**/.*", "node_modules", "components"]
dependencies:
  "commonjs-require-definition": "~0.1.2"
  jquery: "~2.0.3"
  angular: "1.3.x"
  "angular-mocks": "1.3.0-build.3211+sha.0f3adec"
  "angular-scenario": "1.3.x"
  "angular-material": "0.0.2"
  "angular-ui-router": "0.2.11"

overrides:
  "angular":
    dependencies: jquery: "*"
  "angular-mocks":
    main: "README.md"
  "angular-scenario":
    main: "README.md"
