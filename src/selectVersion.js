const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const semver = require('semver')

// 不要使用 stdout，参考链接https://github.com/SBoudrias/Inquirer.js/issues/519
const prompt = inquirer.createPromptModule({ output: process.stderr })

function getReleaseVersion() {
  return new Promise((resolve, reject) => {
    const dir = path.resolve(process.cwd(), 'package.json')
    if (!fs.existsSync(dir)) {
      reject(new Error(dir + 'doesn\'t exist'))
      return
    }
    const version = require(dir).version
    if (!version) {
      reject(new Error('no version in package.json'))
      return
    }
    const releaseType = ['patch', 'minor', 'major', 'prepatch', 'preminor', 'premajor', 'prerelease']
    const choices = releaseType.map(item => `${item}: ${semver.inc(version, item)}`)
    prompt([
      {
        name: 'version',
        type: 'list',
        message: 'Select release version',
        choices: choices
      }
    ]).then(({ version }) => {
      const newVersion = version.split(':')[1].trim()
      resolve(newVersion)
    })
  })
}

module.exports = getReleaseVersion
