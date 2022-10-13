
export const state = () => ({
  planets: {},
  signs: {},
  houses: {},
  aspects: {}
})

export const mutations = {
  setPlanets(state, data) {
    state.planets = data;
  },
  setSigns(state, data) {
    state.signs = data;
  },
  setHouses(state, data) {
    state.houses = data;
  },
  setAspects(state, data) {
    state.aspects = data;
  } 
}