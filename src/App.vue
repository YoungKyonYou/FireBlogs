<template>
  <div class="app-wrapper">
    <div class="app">
      <!--Login, Register, ForgotPassword view에 접속하면
      네비게이션 바를 숨기기 위한 것이다-->
      <Navigation v-if="!navigation" />
      <router-view />
      <!--Login, Register, ForgotPassword view에 접속하면
      Footer를 숨기기 위한 것이다-->
      <Footer v-if="!navigation" />
    </div>
  </div>
</template>
<script>
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "app",
  components: { Navigation, Footer },
  data() {
    return {
      navigation: null,
    };
  },
  created() {
    //onAuthStateChanged 가 발동되면
    //store/index.js에 있는 updateUser mutation이
    //실행되고 user가 true이면 getCurrentUser도 실행된다.
    //user에는 true, false가 담기게 된다.
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser", user);
      }
    });
    this.checkRoute();
  },
  mounted() {},
  methods: {
    checkRoute(){
      //여기 name은 router에 index.js에서 배열에 등록한 name이다.
      if (this.$route.name === "Login" || this.$route.name === "Register" || this.$route.name === "ForgotPassword") {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>
<!--여기에 원래 style lang="scss" 있어야됨 -->
<style lang="scss">
/*
구글 폰트를 사용하기 위한 url
*/
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
/*
모든 어플리케이션에 적용할 스타일
*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
}
.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}
.link-light {
  color: #fff;
}
.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}
.arrow-light {
  path {
    fill: #fff;
  }
}
button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}
.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }
  i {
    margin-left: 8px;
  }
}
.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}
.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}
.error{
  text-align: center;
  font-size: 12px;
  color: red;
}
.blog-card-wrap {
  //요소를 일반적인 문서 흐름에 따라 배치하고 자기 자신을 기준으로
  //top, right, bottom ,left의 값에 따라 오프셋을 적용한다.
  //오프셋은 다른 요소에는 영향을 주지 않는다. 
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 500px) {
    padding: 100px 16px;
  }
  .blog-cards {
    display: grid;
    gap: 32px;
    //열의 배치, fr은 fraction의 줄임말인데 숫자 비율대로 나눈다.
    //즉 여기서는 모두다 동일한 비율을 가진다.
    grid-template-columns: 1fr;
    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>

