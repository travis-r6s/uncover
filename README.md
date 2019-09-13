# Uncover

> Demo app using Hasura Remote Joins - [Preview](https://uncover.now.sh)

Please refer to the article for more information.

### Functions

Install all dependencies (including the Functions [Core Tools](https://docs.microsoft.com/en-gb/azure/azure-functions/functions-run-local)), add `local.settings.json`, and run locally:

```bash
yarn # or npm install
yarn build # Run webpack
func start
```

`local.settings.json`
```json
{
  "IsEncrypted": false,
  "Values": {
    "CLOUDINARY_NAME": "<unsigned upload preset name>"
  }
}
```

### Nuxt

Install all dependencies, add an ENV file, and run locally with:

```bash
yarn # or npm install
yarn develop
```

`.env`
```
APP_URL=http://localhost:3000
AUTH0_CLIENT_DOMAIN=<auth0-application-domain>
AUTH0_CLIENT_ID=<auth0-application-id>
APOLLO_ENDPOINT=<hasura-endpoint>
APOLLO_WSS_ENDPOINT=<hasura-wss-endpoint>
CLOUDINARY_PRESET=<unsigned-upload-preset>
CLOUDINARY_NAME=<account-name>
```
