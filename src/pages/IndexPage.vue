import { createStore } from 'vuex'; export default createStore({ state: { todos: [ { id: 1, content:
'ct1' }, { id: 2, content: 'ct2' }, { id: 3, content: 'ct3' }, { id: 4, content: 'ct4' }, { id: 5,
content: 'ct5' }, ], meta: { totalCount: 1200, }, }, getters: { todos: (state) => state.todos, meta:
(state) => state.meta, }, mutations: { setTodos(state, todos) { state.todos = todos; },
setMeta(state, meta) { state.meta = meta; }, }, actions: { updateTodos({ commit }, todos) {
commit('setTodos', todos); }, updateMeta({ commit }, meta) { commit('setMeta', meta); }, }, });
