import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

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
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  //Vuex는 state에 정의된 변수를 직접 변경하는 것을 허용하지 않는다. 반드시 mutations을 이용해서
  //변경해야 한다. 즉 mutations은 state을 변경시키는 역할을 한다. mutations은 비동기 처리가 아니라
  //동기 처리를 통해 state에 정의된 변수의 변경사항을 추적할 수 있게 해준다.
  //여기서는 payload를 변경하고 싶은 것이고 state 매개변수는 디폴트로 있어야 한다.
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName=payload
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },

    //user state를 바꿔주기 위함이다.
    //payload는 true 아니면 false를 반환한다.
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
      console.log(state.profileAdmin);
    },

    setProfileInfo(state, doc) {
      state.profileId = doc.id;

      //이 doc.data().xx는 firebase dashboard에 보면 Firestore Database에 있는 필드 들이다.
      // https://console.firebase.google.com/project/fireblogs-97644/firestore/data/~2Fusers~2FSzG8w72aePb7r7M8bH0nax7ODiG2
      //필드들의 값을 가져와서 대압하는 것이다.
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },

    setProfileInitials(state) {
      //성하고 이름의 이니셜을 추출하는 것이다.
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },

    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUserName(state, payload) {
      state.profileUserName = payload;
    },
    //우리가 현재 사용자 정보를 얻으려면
    //onAuthStateChanged가 변화가 생기는지 계속 listening하고 있다가 getCurrentUser 함수를
    //실행해줘야 한다. 그러기 위해서는 App.vue로 created 사이클에
    //가서 코드를 추가한다.
  },

  //actions는 mutations과 매우 유사한 역할을 한다. acton을 통해 mutations에 정의된 함수를
  //실행시킬 수 있다. mutations이 있는데 왜 굳이 action을 통해서 mutations을 실행하는지 의문이 있을 수 있다.
  // actions에 정의된 함수 안에서는 여러 개의 mutations을 실행시킬 수 있을 뿐만 아니라, mutations과 달리
  // 비동기 작업이 가능하다. 즉, actions에 등록된 함수는 비동기 처리 후 mutations을 커밋할 수 있어서
  //저장소(store)에서 비동기 처리 로직을 관리할 수 있게 해준다.
  //그리고 commit를 여러 번 호출해야 하는 경우 코드를 단순화하기 위해 '전달인자 분해'를 사용한다.
  //action의 핸드러는 context 객체를 전달인자로 받는데 context 객체는 store의 메소드와
  //속성들을 가지고 있는 객체이다. context.commit를 호출하여 Mutation의 핸들러를 호출하나
  //저렇게 전달인자 분해를 사용해서 단순화 할 수 있다 원래 getCurrentUser(context) context.commit
  //이렇게 해야하는데 저렇게 단순화하는 것이다.
  actions: {
    async getCurrentUser({ commit }, user) {
      //doc()은 파이어베이스 컬렉션 안에 모든 사용자를 가져오므로 특정 사용자를 가져오기 위해서
      //안에 uid인자를 넣어주는 것이다.
      const dataBase = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      //결과를 받아오고 위의 user, profileAdmin..~profileInitials를 초기화해주기 위함이다.
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
      const token = await user.getIdTokenResult();
      //admin이 true이지 false인지 리턴 받는다.
      const admin = await token.claims.admin;
      commit("setProfileAdmin", admin);
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      //위에 await dataBase로 update하는 것이 끝나면
      //우리는 돌아와서 만약 변화가 있다면 setProfileInitials 업데이트 시킨다.
      //setProfileInitials은 이니셜을 추출한다.
      commit("setProfileInitials");
    },
  },
  modules: {},
});

//4:05:18
