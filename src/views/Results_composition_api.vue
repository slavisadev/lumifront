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
      <tbody>
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
import env from "@/env";
import axios from "axios";
import {computed, defineComponent, onMounted, reactive} from "@vue/composition-api";

export default defineComponent({
  name: 'Results',

  setup() {
    const data = reactive({
      results: [],
      sortKey: 'name',
      reverse: false,
      sort: {
        key: '',
        isAsc: false
      },
    });

    function sortedClass(key: string): string {
      return data.sort.key === key ? `sorted ${data.sort.isAsc ? 'asc' : 'desc'}` : '';
    }

    function sortBy(key: string) {
      data.sort.isAsc = data.sort.key === key ? !data.sort.isAsc : false;
      data.sort.key = key;
    }

    const sortedItems = computed(() => {
      const list = data.results.slice();
      if (data.sort.key) {
        list.sort((a, b) => {
          a = a[data.sort.key]
          b = b[data.sort.key]

          return (a === b ? 0 : a > b ? 1 : -1) * (data.sort.isAsc ? 1 : -1)
        });
      }

      return list;
    });

    function getResults(): void {
      axios
          .get(env.apiUrl + '/results')
          .then(response => {
            data.results = response.data
          });
    }

    onMounted(() => {
      getResults()
    })

    return {
      data,
      sortBy,
      sortedClass,
      sortedItems
    };
  },
});
</script>
