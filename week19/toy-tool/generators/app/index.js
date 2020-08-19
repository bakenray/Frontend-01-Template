var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(arg,opts){
    super(arg,opts)
  }
  collecting() {
    this.log('collecting')
  }
  creating(){
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {title:'TemplatingwidthYeoman'}
    )
    this.fs.copyTpl(
      this.templatePath('createElement.js'),
      this.destinationPath('lib/createElement.js')
    )
    this.fs.copyTpl(
      this.templatePath('gesture.js'),
      this.destinationPath('lib/gesture.js')
    )
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    )
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html')
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    )

    this.npmInstall([
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      'webpack',
      'babel-loader',
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-transform-react-jsx',
      "mocha",
      "nyc",
      "@istanbuljs/nyc-config-babel",
      "babel-plugin-istanbul",
    ],{'save-dev':true})
  }
}