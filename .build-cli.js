const pkg = require('./package.json')
module.exports = {
  projectName: pkg.name,
  buildCommand: {
    test: 'npm run build',
    staging: 'npm run build',
  },
  distName: 'dist',
  dependencies: [{
    remoteUrl: 'https://github.com/GOGOGOSIR/cropperjs.git',
    defaultBranch: 'master',
  }]
}
