


// export default {
//   state: {
//     growthRate: 15,
//     unlockedColsCells: parseInt(localStorage.getItem('money')) || 5,
//     unlockedRowsCells: parseInt(localStorage.getItem('money')) || 5,
//   },
//   mutations: {

//     setGardenPosition(state, { id, x, y }) {
//       const index = state.garden.findIndex(pokemon => pokemon.id === id);
//       if (index !== -1) {
//         state.garden[index].x = x;
//         state.garden[index].y = y;
//         localStorage.setItem('garden', JSON.stringify(state.garden)); // Сохранение в localStorage
//       } else {
//         console.error('Pokémon with id', id, 'not found');
//       }
//     },
    
//     setUnlockedCells(state, {price}){
//       state.unlockedColsCells += 1,
//       state.unlockedRowsCells += 1,
//       localStorage.setItem('money', state.money);
//     },
//     setGrowthRate(state, {percentage}){
//       state.growthRate += percentage;
//       setTimeout(() => {
//         this.growthRate -= percentage;
//       }, 5 * 1000);
//     }
//   },
//   actions: {
//     async updateGardenPosition({ commit }, { id, x, y }) {
//       await commit('setGardenPosition', { id, x, y });
//     },


//     unlockedCells({commit}, {row, col}){
//       commit('setUnlockedCells', {row, col})
//     },

//     increaseGrowthRate({commit}, percentage){
//       commit('setGrowthRate', percentage);
//     }
//   },
//   getters: {

//   },
// };


// АХАХАХАХАХАХАХХАХХА СДЕЛАЮ ВСЁ КАК СДЕЛУЕТ
// ЧТО МОЖЕТ ПОЙТИ НЕ ТАК?!?!? АХАХАХХАХАХАХАХАХ
// ЧУТЬ ПОЗЖЕ ЗАКОНЧУ ЭТОТ КОД АХАХАХАХАХАХХАХАХАХАХАХАХАХХАХАХАХ
// АХАХАХАХАХХАХАХАХ У МЕНЯ ЖЕ ЦЕЛЫЙ ДЕНЬ СВОБОДЕН!!!! ТОЧНО БУДЕТ ВРЕМЯ СДЕЛАТЬ АХАХАХАХХАХАХАХАХАХХАХАХАХАХАХ

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@??%@@@@@@@@%*?#@@@@@@@%??#@@@@@@@#??#@@@@@@@#??%@@@@@@@@?*%@@@@@@@@%?%@@@@@@@@%*?#@@@@@@@S?*#@@@@@@@#??#@@@@@@@#?*%@@@@@@@@?*?@@@@@@@@%?%@@@@@@@@%*?@@@@@@@@%*?#@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@?...%@@@@@@@#;.:S@@@@@*..?@@@@@@@#:..;@@@@@@@@?,.*@@@@@S:.:S@@@@@@@?...%@@@@@@@#;.:S@@@@@?..*@@@@@@@@;..:@@@@@@@@%,.+@@@@@#;.:S@@@@@@@%...?@@@@@@@S:.;#@@@@@+.,%@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@%,:?,,#@@@@@@@@*.,?@@#;.:S@@@@@@@@+.++.*@@@@@@@@S:.;#@@%,.*@@@@@@@@S,,?,,S@@@@@@@@?,.?@@#+.:S@@@@@@@@+.++.+@@@@@@@@#;.:#@@%,.+@@@@@@@@#,,?,,S@@@@@@@@+.,%@@#:.;#@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@#,.%@*.;@@@@@@@@@%,.*%:.+@@@@@@@@@*.;@@:.?@@@@@@@@@+.,%*.,%@@@@@@@@#:.?@?.:#@@@@@@@@S:.+%:.+#@@@@@@@@?.:@@:.?@@@@@@@@@*.,%*.,?@@@@@@@@@:.?@%.:#@@@@@@@@?,.*%,.*@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@;.*@@@;.+@@@@@@@@@#;..,?@@@@@@@@@%.,#@@S,,S@@@@@@@@@%,..;#@@@@@@@@@;.+@@@+.;@@@@@@@@@#+...?@@@@@@@@@S,,S@@S,,%@@@@@@@@@%,..:#@@@@@@@@@+.+@@@*.;@@@@@@@@@#:..,%@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@+.;@@@@#:.?@@@@@@@@#;..,?@@@@@@@@#,.%@@@@?.:#@@@@@@@@?,..:#@@@@@@@@*.:@@@@#:.*@@@@@@@@#;...*@@@@@@@@#:.?@@@@?.,#@@@@@@@@%,..:S@@@@@@@@?.:#@@@@;.*@@@@@@@@S:..,%@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@?..::::::,.,S@@@@@@%,.*%:.+#@@@@@@:.,::::::..;@@@@@@@+.:%*.,%@@@@@@%..,:::::,..%@@@@@@%,.+S:.;#@@@@@@;.,::::::,.;@@@@@@@+.,%*.,?@@@@@@%,.,:::::,..?@@@@@@?,.*%,.+@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@S,,%SSSSSSS*.,#@@@@*.,%@@#;.:S@@@@+.;SSSSSSSS:.*@@@@S:.;#@@%,.+@@@@S,.?SSSSSSS?.,S@@@@*.,?@@@+.,%@@@@*.:SSSSSSSS:.+@@@@#:.;#@@%,.+@@@@#,.?SSSSSSS?.,S@@@@+.,%@@#;.:S@@@@@@@@@@@@@
// @@@@@@@@@@@@#,.*@@@@@@@@@+.:@@S:.:S@@@@@*..*@@*.,#@@@@@@@@S,.?@@?..*@@@@@#;.:S@#:.*@@@@@@@@@+.:#@#;.:S@@@@@?,.*@@?.,S@@@@@@@@#,.?@@?,.*@@@@@#;.:S@#:.+@@@@@@@@@*.,#@S:.;#@@@@@*.,?@@@@@@@@@@@@
// @@@@@@@@@@@@S??@@@@@@@@@@#??#@%??#@@@@@@@S??#@??S@@@@@@@@@@S??@#??S@@@@@@@@??%@S??@@@@@@@@@@@??S@%??#@@@@@@@S??S@??S@@@@@@@@@@S??@#??%@@@@@@@@???@#??@@@@@@@@@@@??S@???@@@@@@@@%??#@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@