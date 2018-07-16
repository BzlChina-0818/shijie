const mock = {}
// const noProxy = (process.env.NO_PROXY === 'true')
require('fs').readdirSync(require('path').join(__dirname + '/src/mock')).forEach(function(file) {
	Object.assign(mock, require('./src/mock/' + file))
})
module.exports = mock



