<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation/>
      <router-view />
      <Footer/>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';

export default {
  name: "app",
  components: {Navigation, Footer},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
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
</style>
