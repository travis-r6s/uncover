import auth0Js from 'auth0-js'

const APP_URL = process.env.APP_URL
const CLIENT_DOMAIN = process.env.AUTH0_CLIENT_DOMAIN
const CLIENT_ID = process.env.AUTH0_CLIENT_ID

const webAuth = new auth0Js.WebAuth({
  domain: CLIENT_DOMAIN,
  clientID: CLIENT_ID,
  redirectUri: `${APP_URL}/login/callback`,
  audience: 'https://' + CLIENT_DOMAIN + '/api/v2/',
  responseType: 'token id_token',
  scope: 'openid profile email'
})

const authFunctions = {
  login: () => webAuth.authorize(),
  parseHash: hash => new Promise((resolve, reject) => {
    webAuth.parseHash({ hash }, (err, authResult) => {
      if (err) reject(err)
      resolve(authResult)
    })
  }),
  logout: () => webAuth.logout({ returnTo: `${APP_URL}/login`, clientID: CLIENT_ID })
}

export default (ctx, inject) => {
  inject('auth', authFunctions)
}
