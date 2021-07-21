import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Blog Card #1",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1, 2021",
      },
      {
        blogTitle: "Blog Card #2",
        blogCoverPhoto: "stock-2",
        blogDate: "May 1, 2021",
      },
      {
        blogTitle: "Blog Card #3",
        blogCoverPhoto: "stock-3",
        blogDate: "May 1, 2021",
      },
      {
        blogTitle: "Blog Card #4",
        blogCoverPhoto: "stock-4",
        blogDate: "May 1, 2021",
      },
    ],
    editPost: null,
  },
  //Vuex는 state에 정의된 변수를 직접 변경하는 것을 허용하지 않는다. 반드시 mutations을 이용해서
  //변경해야 한다. 즉 mutations은 state을 변경시키는 역할을 한다. mutations은 비동기 처리가 아니라
  //동기 처리를 통해 state에 정의된 변수의 변경사항을 추적할 수 있게 해준다. 
  //여기서는 payload를 변경하고 싶은 것이고 state 매개변수는 디폴트로 있어야 한다.
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
  },
  actions: {},
  modules: {},
});
