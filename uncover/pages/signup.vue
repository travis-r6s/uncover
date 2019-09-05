<template>
  <div class="columns is-centered is-vcentered">
    <div class="column is-one-third">
      <h1 class="title">
        Signup
      </h1>
      <h3 class="subtitle">
        We just need a few details to get you started.
      </h3>
      <hr>
      <form
        @submit.prevent="signup"
        class="form">
        <div class="box">
          <b-field label="Email">
            <b-input
              v-model="user.email"
              placeholder="jane@doe.com"
              required />
          </b-field>
          <b-field label="Password">
            <b-input
              v-model="user.password"
              type="password"
              placeholder="iwantmytreasure"
              password-reveal />
          </b-field>
        </div>
        <div class="box">
          <b-field label="First Name">
            <b-input
              v-model="profile.first_name"
              placeholder="Jane"
              required />
          </b-field>
          <b-field label="Last Name">
            <b-input
              v-model="profile.last_name"
              placeholder="Doe"
              required />
          </b-field>
          <b-field label="Username">
            <b-input
              v-model="profile.username"
              placeholder="janedoe123"
              required />
          </b-field>
        </div>
        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <b-button
              :loading="loading"
              type="is-primary"
              native-type="submit">
              Create Account
            </b-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    user: {
      email: '',
      password: ''
    },
    profile: {
      first_name: '',
      last_name: '',
      username: ''
    }
  }),
  methods: {
    async signup () {
      try {
        this.loading = true
        const { idToken } = await this.$auth.signup(this.user)
        console.log(idToken)
      } catch (error) {
        this.loading = false
        this.$buefy.toast.open({
          type: 'is-danger',
          message: error.message
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.columns {
  height: 80vh;
}
</style>
