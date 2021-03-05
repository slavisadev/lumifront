<template>
  <div class="container pt-6">
    <div class="content has-text-centered">
      <h1 v-if="data.currentUser">Welcome, {{ data.currentUser.name }}</h1>
      <p>This is your page with results. Try to guess the the IMDB rating of a movie displayed bellow.</p>
    </div>
    <ul class="search-results" v-if="selectedResult.length > 0">
      <li :key="index" v-for="(result, index) in selectedResult">
        <img :src="result.Poster" alt="">
        <h3>
          {{ result.Title }}
        </h3>
        <span>
          <div class="column column">
            <div class="field has-addons has-addons-centered is-fullwidth">
              <div class="control">
                <input
                    v-model="data.score"
                    class="input"
                    type="number"
                    placeholder="Enter score"
                >
              </div>
              <div class="control">
                <button
                    @click.prevent="saveVote(result.imdbID)"
                    :disabled="data.saveVoteButtonDisabled"
                    class="button is-info"
                >Save</button>
              </div>
            </div>
            <p v-if="scoreInvalid" class="help is-danger">Score must be between 0 and 9</p>
          </div>
        </span>
      </li>
    </ul>
    <div class="has-text-centered" v-if="data.activeSlide === data.results.length && data.results.length > 0">
      That's it. Thanks.
      <br>
      Your result: {{ data.voteSuccess }}/{{ data.votes.length }}
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted, reactive} from "@vue/composition-api";
import axios from "axios";
import env from "@/env";

export default defineComponent({
  name: 'SearchResults',
  props: ['term', 'username'],
  setup(props) {

    const data = reactive({
      results: [],
      searchTerm: props.term,
      activeSlide: 0,
      score: null,
      votes: [],
      voteSuccess: 0,
      currentUser: null,
      saveVoteButtonDisabled: false,
      username: null
    });

    function analyzeVotes(): void {

      const correctVotes = data.votes.filter(vote => {
        return Math.abs(vote.proposedScore - vote.realScore) <= 1
      })

      data.voteSuccess = correctVotes.length
    }

    const scoreInvalid = computed(() => {
      return data.score > 9 || data.score < 0 || data.score === null
    })

    function saveVote(imdbID: string): void {
      if (scoreInvalid.value) {
        return false
      }
      data.saveVoteButtonDisabled = true;
      axios
          .post(env.apiUrl + '/vote/', {
            imdbID,
            score: data.score
          })
          .then(response => {
            const realScore = response.data;

            data.votes.push({
              proposedScore: parseInt(data.score),
              realScore: realScore
            })
            data.score = null
            data.activeSlide++;
            data.saveVoteButtonDisabled = false;
          })
          .catch(() => {
            data.saveVoteButtonDisabled = false;
          });
    }

    function saveScore(): void {
      axios
          .post(env.apiUrl + '/score/', {
            score: data.voteSuccess,
            searchTermId: data.searchTerm.id,
            user: data.username
          })
          .then(() => {
            console.log('Saved');
          });
    }

    const selectedResult = computed(() => {
      if (data.results.length === 0) {
        return [];
      }

      if (data.activeSlide === data.results.length) {
        analyzeVotes()
        saveScore()
        return [];
      } else {
        return [data.results[data.activeSlide]]
      }
    })


    onMounted(async () => {

      axios
          .post(env.apiUrl + '/search/' + props.term, {
            username: props.username
          })
          .then(response => {
            data.results = response.data.results
            data.searchTerm = response.data.searchTerm
            localStorage.setItem('currentUser', JSON.stringify(response.data.user))
          });

      data.currentUser = await JSON.parse(localStorage.getItem('currentUser'))
    })

    return {
      selectedResult,
      saveVote,
      scoreInvalid,
      data
    };
  }
});
</script>
<style lang="scss">
.search-results {
  li {
    display: block;
    text-align: center;

    h3 {
      font-size: 20px;
    }

    span {
      display: block;
    }
  }
}
</style>
