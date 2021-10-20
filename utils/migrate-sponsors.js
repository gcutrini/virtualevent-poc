const fs = require('fs')
const path = require('path')
const jq = require('node-jq')
const kebabCase = require('lodash.kebabcase');

const sponsorsFilepath = '../src/content/sponsors.json';
const sponsorsPath = '../src/content/sponsors';

const filter = 'flatten | map({ tier } + (.sponsors | to_entries | map({ order: .key } + .value))[])'
jq.run(filter, sponsorsFilepath, {})
  .then((output) => {
    try {
      let sponsors = JSON.parse(output);
      let promises = sponsors.map(sponsor => {
        let filename = kebabCase(sponsor.name)
        return fs.writeFile(`${sponsorsPath}/${filename}.json`, JSON.stringify(sponsor, null, 2), function(err) {
            if (err) {
                return console.log('error creating the sponsor files', err)
            }
            console.log('sponsor files created')
        })
      })
      Promise.all(promises)
        .then(() => {
          console.log('sponsors files created')
        })
        .catch(err => {
          console.log('error creating the sponsors files', err)
        })
    } catch (err) {
        console.log('error parsing sponsors json', err)
    }
  })
  .catch((err) => {
    console.log('error formatting sponsors', err)
  })