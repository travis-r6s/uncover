import { queryField, stringArg, intArg, booleanArg } from 'nexus'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME
})

export const TransformImage = queryField('transform_image_url', {
  type: 'String',
  description: 'Add transformation parameters to an image URL',
  args: {
    url: stringArg({ description: 'Image URL to transform', required: true }),
    width: intArg({ description: 'The required width of the transformed image.' }),
    height: intArg({ description: 'The required height of the transformed image.' }),
    crop: stringArg({ description: 'A crop mode that determines how to transform the image for fitting into the desired width & height dimensions.' }),
    gravity: stringArg({ description: 'Determines which part of the image to keep when any part of the image is cropped.' }),
    format: stringArg({ description: 'Deliver the file in the requested format.' }),
    quality: intArg({ description: 'Control the JPEG, WebP, GIF, JPEG XR and JPEG 2000 compression quality - defaults to auto.' }),
    radius: intArg({ description: 'Round the specified corners of an image by specifying pixel values.' }),
    responsive: booleanArg({ description: 'Whether to create responsive images for the current device - default to true' }),
    effect: stringArg({ description: 'Apply a filter or an effect on an image.' })
  },
  resolve: async (parent, { url, ...args }, ctx, info) => {
    const image = url.slice(url.lastIndexOf('/') + 1)
    const { format = 'auto', width, height, gravity, crop, radius, quality = 'auto', dpr = 'auto', responsive = true, effect } = args
    return cloudinary.url(image, { format, width, height, gravity, crop, dpr, quality, responsive, radius, effect })
  }
})
