const { request } = require('graphql-request')
module.exports = async function (context, myTimer) {
  var timeStamp = new Date().toISOString()

  const query = `{
    images(limit: 10) {
      id
      transform_url
    }
  }`
  await request('https://uncover-app.herokuapp.com', query)
  context.log('JavaScript timer trigger function ran!', timeStamp)
}
