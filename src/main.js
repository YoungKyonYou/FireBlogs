import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import firebase from "firebase/app";
import "firebase/auth";

//Vue2Editor 추가함 이것은 텍스트 에디터 툴들을 제공한다
Vue.use(Vue2Editor);

Vue.config.productionTip = false;

let app;
//이것은 애프리케이션과 파이어베이스가 동기화가 안되는 것을 막아줌
firebase.auth().onAuthStateChanged(() => {
  //app이 아직 초기화 되지 않앗다면
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
})


