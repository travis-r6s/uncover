<template>
  <section class="section">
    <div class="has-text-centered">
      <b-button
        v-show="updates"
        @click="fetchUpdates"
        type="is-info">
        <small>Updates available</small>
        <b-icon
          icon="refresh"
          size="is-small" />
      </b-button>
    </div>
    <br>
    <div class="columns is-centered">
      <div
        v-if="images"
        class="column is-one-third">
        <lazy-hydrate
          v-for="image in images.nodes"
          :key="image.id"
          when-visible>
          <image-card
            :image="image"
            @openModal="openModal" />
        </lazy-hydrate>
      </div>
    </div>
    <image-modal
      :image="modal.image"
      :active="modal.active"
      @close="modal.active = false" />
    <client-only>
      <infinite-loading
        v-if="shouldFetchMore"
        @infinite="fetchMore" />
    </client-only>
  </section>
</template>

<script>
// Components
import LazyHydrate from 'vue-lazy-hydration'
import InfiniteLoading from 'vue-infinite-loading'
import ImageCard from '@/components/ImageCard'
import ImageModal from '@/components/ImageModal'
// Queries
import ALL_IMAGES_QUERY from '@/graphql/Images/AllImages.gql'
import ALL_IMAGES_SUBSCRIPTION from '@/graphql/Images/AllImagesSubscription.gql'
export default {
  components: {
    LazyHydrate,
    InfiniteLoading,
    ImageCard,
    ImageModal
  },
  data: () => ({
    offset: 0,
    shouldFetchMore: true,
    updates: false,
    time: new Date().toUTCString(),
    modal: {
      active: false,
      image: {}
    }
  }),
  apollo: {
    images: {
      prefetch: true,
      query: ALL_IMAGES_QUERY,
      variables: {
        limit: 10
      }
    },
    $subscribe: {
      images: {
        query: ALL_IMAGES_SUBSCRIPTION,
        variables: {
          time: new Date().toUTCString()
        },
        result ({ data: { images } }) {
          if (images.aggregate.count) this.updates = true
        }
      }
    }
  },
  methods: {
    fetchUpdates () {
      this.$apollo.queries.images.fetchMore({
        variables: {
          where: {
            created_at: {
              _gt: this.time
            }
          }
        },
        updateQuery: ({ images }, { fetchMoreResult }) => {
          const newImages = fetchMoreResult.images.nodes
          this.updates = false
          return {
            images: {
              ...images,
              nodes: [...newImages, ...images.nodes]
            }
          }
        }
      })
    },
    fetchMore ($state) {
      this.offset = this.offset + 10
      this.$apollo.queries.images.fetchMore({
        variables: {
          limit: 10,
          offset: this.offset
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newImages = fetchMoreResult.images.nodes
          const previousImages = previousResult.images
          if (newImages.length < 10) this.shouldFetchMore = false
          $state.loaded()
          return {
            images: {
              ...previousImages,
              nodes: [...previousImages.nodes, ...newImages]
            }
          }
        }
      })
    },
    openModal (image) {
      this.modal = {
        active: true,
        image
      }
    }
  }
}
</script>
