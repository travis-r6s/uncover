<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item
        :to="{ path: '/' }"
        tag="nuxt-link">
        Uncover
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="#">
        Home
      </b-navbar-item>
      <b-navbar-item href="#">
        Documentation
      </b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item href="#">
          About
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template
      slot="end"
      v-if="!isAuthenticated">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <b-button
            @click="$auth.login()"
            class="button is-light">
            Log in
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    isAuthenticated () { return !!this.$apolloHelpers.getToken() }
  }
}
</script>
