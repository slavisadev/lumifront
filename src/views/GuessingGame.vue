<template>
  <div class="container pt-6">
    <div v-if="data.searchResults.length === 0">
      <div class="columns">
        <div class="field column">
          <label class="label">Movie Search Term</label>
          <div class="control">
            <input
                v-model="data.searchTerm"
                class="input"
                type="text"
                placeholder="Search for a movie...">
          </div>
          <p v-if="!data.searchTerm && data.validationActive" class="help is-danger">Please enter the name of the movie</p>
        </div>
        <div class="field column">
          <label class="label">Username</label>
          <div class="control">
            <input
                v-model="data.username"
                class="input"
                type="text"
                placeholder="Your username">
          </div>
          <p v-if="!data.username && data.validationActive" class="help is-danger">Username must not be empty.</p>
        </div>
      </div>
      <div class="columns">
        <div class="field column">
          <div class="control level-right">
            <a @click="search" class="button is-link">Submit</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from "@vue/composition-api";

export default defineComponent({
  setup() {
    const data = reactive({
      username: null,
      searchTerm: null,
      validationActive: false,
      searchResults: [],
    });

    function search(): void {
      data.validationActive = true;
      if (!data.username || !data.searchTerm) {
        return;
      }

      this.$router.push('search-results/' + data.searchTerm + '/' + data.username);
    }

    return {
      data,
      search,
    };
  },
});
</script>
