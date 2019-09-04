<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-one-third">
        <h1 class="title is-size-4">
          Create Image post
        </h1>
        <hr>
        <form
          @submit.prevent="insertImage"
          class="form">
          <div class="box">
            <b-field label="Title">
              <b-input
                v-model="image.title"
                placeholder="Beautiful Landscape"
                required />
            </b-field>
            <b-field label="Description">
              <b-input
                v-model="image.description"
                maxlength="200"
                type="textarea"
                placeholder="Lorem ipsum dolor amet lomo coloring book poke, raclette chartreuse freegan mustache dreamcatcher"
                required />
            </b-field>
          </div>
          <div class="box">
            <b-field v-if="!src">
              <b-upload
                @input="setImage"
                drag-drop>
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon
                        icon="upload"
                        size="is-large" />
                    </p>
                    <p>Drop your file here or click to upload</p>
                  </div>
                </section>
              </b-upload>
            </b-field>
            <figure
              v-if="src"
              class="image">
              <img
                :src="src"
                :alt="image.altText">
            </figure>
            <br>
            <b-field>
              <b-input
                v-model="image.altText"
                placeholder="Brief Image Description"
                required />
            </b-field>
          </div>
          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <b-button
                type="is-primary"
                native-type="submit">
                Save
              </b-button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    file: null,
    src: '',
    image: {
      title: '',
      description: '',
      altText: ''
    }
  }),
  methods: {
    setImage (file) {
      this.file = file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => { this.src = reader.result }
    },
    insertImage () {
      console.log('uploading')
    }
  }
}
</script>
