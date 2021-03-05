<template>
  <div class="container pt-6">
    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>
          <a
              href="#"
              :class="sortedClass('name')"
              @click.prevent="sortBy('name')"
          >Username</a>
        </th>
        <th>Done at (datetime)</th>
        <th>
          <a
              href="#"
              :class="sortedClass('term')"
              @click.prevent="sortBy('term')"
          >Term</a>
        </th>
        <th><a
            href="#"
            :class="sortedClass('score')"
            @click.prevent="sortBy('score')"
        >Score</a></th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th>User</th>
        <th>Done at (datetime)</th>
        <th>Term</th>
        <th>Score</th>
      </tr>
      </tfoot>
      <tbody v-if="getResults">
      <tr v-for="(result, index) in sortedItems" :key="index">
        <td>{{ result.name }}</td>
        <td>{{ result.created_at }}</td>
        <td>{{ result.term }}</td>
        <td>{{ result.score }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "@vue/composition-api";

export default defineComponent({
  name: 'Results',
  data() {
    return {
      sortKey: 'name',
      reverse: false,
      sort: {
        key: '',
        isAsc: false
      },
    }
  },
  computed: {
    sortedItems() {
      const list = this.getResults.slice();
      if (this.sort.key) {
        list.sort((a, b) => {
          a = a[this.sort.key]
          b = b[this.sort.key]

          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
        });
      }

      return list;
    },
    getResults: {
      get: function () {
        return this.$store.getters['results/getResults'];
      }
    }
  },
  methods: {
    sortedClass(key: string): string {
      return this.sort.key === key ? `sorted ${this.sort.isAsc ? 'asc' : 'desc'}` : '';
    },

    sortBy(key: string) {
      this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
      this.sort.key = key;
    },
  },
  mounted() {
    this.$store.dispatch('results/initAllResults');
  }
});
</script>
