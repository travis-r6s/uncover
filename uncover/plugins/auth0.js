import auth0Js from 'auth0-js'
import decode from 'jwt-decode'

const APP_URL = process.env.APP_URL
const CLIENT_DOMAIN = process.env.AUTH0_CLIENT_DOMAIN
const CLIENT_ID = process.env.AUTH0_CLIENT_ID

const webAuth = new auth0Js.WebAuth({
  domain: CLIENT_DOMAIN,
  clientID: CLIENT_ID,
  redirectUri: `${APP_URL}/callback`,
  audience: 'https://' + CLIENT_DOMAIN + '/api/v2/',
  responseType: 'token id_token',
  scope: 'openid profile email'
})

const authFunctions = ctx => {
  const login = () => webAuth.authorize()
  const parseHash = hash => new Promise((resolve, reject) => {
    webAuth.parseHash({ hash }, (err, authResult) => {
      if (err) reject(err)
      resolve(authResult)
    })
  })
  const getUser = ({ app }) => {
    const token = app.$apolloHelpers.getToken()
    if (!token) return {}
    const user = decode(token)
    const hasura = user[ 'https://hasura.io/jwt/claims' ]
    return {
      id: hasura[ 'x-hasura-user-id' ]
    }
  }

  const logout = () => webAuth.logout({ returnTo: `${APP_URL}`, clientID: CLIENT_ID })

  return {
    login,
    parseHash,
    logout,
    user: getUser(ctx)
  }
}

export default (ctx, inject) => {
  inject('auth', authFunctions(ctx))
}
