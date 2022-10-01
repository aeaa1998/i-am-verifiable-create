import actions from "./actions";
import store from "./store";

export default {
    state: store.state,
    getters: store.getters,
    actions
  }