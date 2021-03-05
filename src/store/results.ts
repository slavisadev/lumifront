import env from '../env';
import axios from 'axios'

function initialState() {
    return {
        results: []
    };
}

const results = {
    namespaced: true,
    state: {
        initialState: initialState,
        results: initialState().results
    },
    getters: {
        getResults: state => {
            return state.results;
        },
    },
    mutations: {
        'INIT_RESULTS'(state) {
            return new Promise(() => {
                axios
                    .get(env.apiUrl + '/results')
                    .then(response => {
                        state.results = response.data;
                    });
            });
        },
    },
    actions: {
        initAllResults: ({commit}) => {
            commit('INIT_RESULTS');
        },
    },
};
export default results;
