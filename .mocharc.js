const path = require('path');

require('ts-node').register({
  project: path.join(__dirname, 'tsconfig.json'),
});

module.exports = {
  extension: ["ts"],
  spec: "./**/*.spec.ts",
  require: [path.join(__dirname, 'mocha.setup.ts')],
}
