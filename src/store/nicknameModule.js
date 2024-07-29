// store/nicknameModule.js  
const state = {
    nicknames: JSON.parse(localStorage.getItem('pokemonNicknames')) || {}
};

const mutations = {
    SET_NICKNAME(state, { pokemonId, nickname }) {
        state.nicknames = { ...state.nicknames, [pokemonId]: nickname };
        localStorage.setItem('pokemonNicknames', JSON.stringify(state.nicknames));
    },
    REMOVE_NICKNAME(state, pokemonId) {
        // Использование delete для удаления свойства
        delete state.nicknames[pokemonId];
        localStorage.setItem('pokemonNicknames', JSON.stringify(state.nicknames));
    }
};

const actions = {
    setNickname({ commit }, { pokemonId, nickname }) {
        commit('SET_NICKNAME', { pokemonId, nickname });
    },
    removeNickname({ commit }, pokemonId) {
        commit('REMOVE_NICKNAME', pokemonId);
    }
};

const getters = {
    getNickname: (state) => (pokemonId) => state.nicknames[pokemonId] || ''
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
/////// 