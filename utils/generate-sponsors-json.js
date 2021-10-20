const fs = require('fs')
const path = require('path')
const jq = require('node-jq')

const sponsorsPath = '../src/content/sponsors'
const sponsorsFilePath = '../src/content/sponsors.json'
const sponsorsTiersFilePath = '../src/content/sponsors-tiers.json'

const listFiles = (dir) => {
  const reducer = (list, file) => {
    const name = path.join(dir, file)
    const isDir = fs.statSync(name).isDirectory()
    return list.concat(isDir ? listFiles(name) : [name])
  }
  return fs.readdirSync(dir).reduce(reducer, [])
}

jq.run( '[.tiers[]["name"]]', sponsorsTiersFilePath, {})
  .then((output) => {
    try {
      const sponsorsTiersOrder = JSON.parse(output)
      //const filter = '{ tierSponsors: [ group_by(.tier)[] | { tier: map(.tier) | flatten | unique, sponsors: map(del(.tier)) } ] }'
      const filter = '[ group_by(.tier)[] | { tier: map(.tier) | flatten | unique, sponsors: sort_by(.order) | map(del(.tier)) } ]'
      const sponsorFiles = listFiles(sponsorsPath)
      const options = { slurp: true }
      jq.run(filter, sponsorFiles, options)
        .then((output) => {
          try {
            const sponsors = JSON.parse(output)
            const sortedSponsorsByTier = sponsors.sort((a, b) => {
              return (
                sponsorsTiersOrder.indexOf(a.tier[0].label) - sponsorsTiersOrder.indexOf(b.tier[0].label)
              )
            })
            const sponsorsFile = `{ "tierSponsors": ${JSON.stringify(sortedSponsorsByTier, null, 2)} }`
            fs.writeFile(sponsorsFilePath, sponsorsFile, function(err) {
              if (err) {
                  return console.log('error creating the sponsors file', err);
              }
              console.log('sponsors file created');
            })
          } catch (err) {
            console.log('error parsing sponsors json', err)
          }
        })
        .catch((err) => {
          console.log('error formatting sponsors json', err)
        })
    } catch (err) {
        console.log('error parsing sponsors tiers order json', err)
    }
  })
  .catch((err) => {
    console.log('error formatting sponsors tiers order json', err)
  })