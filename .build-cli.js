const pkg = require('./package.json')
module.exports = {
  projectName: pkg.name,
  buildCommand: {
    test: 'npm run build',
    staging: 'npm run build',
  },
  dependencies: [{
    remoteUrl: 'https://github.com/GOGOGOSIR/demo-release.git',
    defaultBranch: 'master',
  }]
}
