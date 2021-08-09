<template>
  <div class="home">

    <!-- :는 v-bind의 약자이다. -->
    <!--v-for 디렉티브로 반복되어 렌더링이 된 태그들을 vue가 기억할 수 있는
    방법이 바로 key값이다. 그래서 vue는 v-for 디렉티브에는 항상 유니크한 key값을
    선언해줄 것을 권한다. 여기선 :key="index"로 index를 유니크한 값으로 정해준다.
    (v-bind는 jquery의 attr과 비슷하다고 생각하기) 여기서는 BlogPost.vue에 있는
    props에 post라고 되어 있는 부분과 바인딩 된다. -->
    <BlogPost v-if="!user" :post="welcomeScreen"/>
    <!--여기서 sampleBlogPost는 이 Home.vue에 데이터로 정의되어 있는데
    이 BlogPost의 props로 데이터를 넘겨주는 것이다 그러헤 되면
    BlogPost는 props에서 정의된 이름으로 sampleBlogPost를 가져다가 쓸 수 있다.-->
    <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index"/>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post,index) in blogPostsCards" :key="index"/>
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for FireBlogs<Arrow class="arrow arrow-light"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost"
import BlogCard from "../components/BlogCard";
import Arrow from "../assets/Icons/arrow-right-light.svg"
export default {
  name: "Home",
  components: {BlogPost, BlogCard, Arrow},
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },
    };
  },
  computed: {
    blogPostsFeed() {
      return this.$store.getters.blogPostsFeed;
    },
    blogPostsCards() {
      return this.$store.getters.blogPostsCards;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates{
  .container{
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media(min-width: 800px){
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button{
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media(min-width: 800px){
        margin-left: auto;
      }
    }

    h2{
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align:center;
      text-transform: uppercase;
      @media(min-width: 800px){
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
