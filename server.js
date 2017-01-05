require('babel-core/register')({});
['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});
require('babel-polyfill');

var server = require('./server/server').default;

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
