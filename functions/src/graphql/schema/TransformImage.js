import { queryField, stringArg } from 'nexus'

export const TransformImage = queryField('transform_image_url', {
  type: 'String',
  description: 'Add transformation parameters to an image URL',
  args: {
    url: stringArg({ description: 'Image URL to transform', required: true })
  },
  resolve: async (parent, { url, ...args }, ctx, info) => {
    return url
  }
})
