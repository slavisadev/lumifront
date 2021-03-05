<template>
  <div class="about">
    <div>
      <div class="tabs is-centered">
        <ul>
            <router-link tag="li" exact active-class="is-active" :to="'/'">
              <a href="#">Guessing Game</a>
            </router-link>
            <router-link tag="li" exact active-class="is-active" :to="'/results'">
              <a href="#">Results</a>
            </router-link>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'TheApp'
});

</script>
