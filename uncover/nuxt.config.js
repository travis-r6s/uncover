require('dotenv').config()

export default {
  mode: 'universal',

  env: {
    APP_URL: process.env.APP_URL,
    AUTH0_CLIENT_DOMAIN: process.env.AUTH0_CLIENT_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    APOLLO_ENDPOINT: process.env.APOLLO_ENDPOINT,
    APOLLO_WSS_ENDPOINT: process.env.APOLLO_WSS_ENDPOINT,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_PRESET: process.env.CLOUDINARY_PRESET
  },

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#fff' },

  css: [
    '~/styles/main.scss',
    'typeface-rufina',
    'typeface-open-sans'
  ],

  plugins: [
    { src: '~/plugins/auth0', mode: 'client' }
  ],

  buildModules: [
    '@nuxtjs/eslint-module'
  ],

  modules: [
    '@nuxtjs/apollo',
    'nuxt-buefy',
    '@nuxtjs/style-resources'
  ],

  apollo: {
    tokenName: 'uncover',
    cookieAttributes: {
      expires: 1
    },
    includeNodeModules: true,
    clientConfigs: {
      default: {
        httpEndpoint: process.env.APOLLO_ENDPOINT,
        wsEndpoint: process.env.APOLLO_WSS_ENDPOINT
      }
    }
  },

  buefy: {
    css: false,
    materialDesignIcons: true
  },

  styleResources: {
    scss: ['~/styles/_variables.scss']
  },

  meta: {
    name: 'Uncover',
    author: 'Hasura',
    description: 'An Instagram-style app showing off Remote Joins',
    theme_color: '#00000f'
  },

  modern: true,
  build: {
    extractCSS: true,
    optimizeCSS: {
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }]
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  }
}
