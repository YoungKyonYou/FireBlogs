<template>
 <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: 'Home' }">FireBlogs</router-link>
          <ul>
            <li>
              <a href="#"><youTube class="svg-icon"/></a>
            </li>
            <li>
              <a href="#"><twitter class="svg-icon"/></a>
            </li>
            <li>
              <a href="#"><instagram class="svg-icon"/></a>
            </li>
            <li>
              <a href="#"><linkedin class="svg-icon"/></a>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
            <router-link class="link" :to="{ name: 'CreatePost' }">Create Post</router-link>
            <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login In / Register</router-link>
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright 2021 All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>
<script>
import youTube from "../assets/Icons/youtube-brands.svg";
import twitter from "../assets/Icons/twitter-brands.svg";
import instagram from "../assets/Icons/instagram-brands.svg";
import linkedin from "../assets/Icons/linkedin-brands.svg";
export default {
  name: "footer-vue",
  components: {
    youTube,
    twitter,
    instagram,
    linkedin,
  },
  computed:{
    user(){
            //true or false를 반환
       return this.$store.state.user;
    },
  }
};
//50:00
</script>

<style lang="scss" scoped>
footer {
    //auto는 브라우저가 자동으로 계산하는 값이다. 
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;
  .container {
    display: flex;
    flex-direction: column;
    //행과 열 사이의 간격을 설정
    gap: 32px;
    //media는 if 조건문과 비슷하다
    //media 타입의 기본 값은 all이다 따라서 다음 구문은
    //@media all and (min-width: 800px){...}이다.
    //즉 모든 유형의 장치이며 최소너비 800px일 때 스타일을 적용하겠다는 의미다.
    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0px;
    }
    //>는 자식 선택자를 의미한다.
    > div {
      display: flex;
      flex: 1;
    }
    .left {
      gap: 32px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 800px) {
        flex-direction: row;
        //initial은 초기값을 준다. 
        align-items: initial;
        gap: 0;
      }
      .header {
        text-align: center;
        font-size: 24px;
        color: #fff;
        margin-bottom: 16px;
        text-decoration: none;
        font-weight: 600;
        @media (min-width: 800px) {
          text-align: initial;
        }
      }
      ul {
        gap: 16px;
        list-style: none;
        display: flex;
      }
      .col-1,
      .col-2 {
        gap: 32px;
        display: flex;
        flex: 1;
        @media (min-width: 800px) {
          gap: 0;
        }
      }
      .col-1 {
        flex-direction: column;
        h2 {
          text-align: center;
          @media (min-width: 800px) {
            text-align: initial;
          }
        }
        ul {
          margin-top: auto;
          li {
            display: flex;
            align-items: center;
            .svg-icon {
              width: 24px;
              height: auto;
              color: #fff;
            }
          }
        }
      }
      .col-2 {
        ul {
          height: 100%;
          //justify-content(가로축-중심축) align-items(세로축-교차축)
          //여기선 요소들을 컨테이너 중앙으로 정렬한다.
          justify-content: center;
          flex-direction: row;
          //요소들이 강제로 한줄에 배치되게 할 것인지 또는 가능한 영역 내에서
          //벗어나지 않고 여러 행으로 나누어 표현할 것인지 결정한다
          //wrap은 요소들이 내부 로직에 의해 분할되어 여러 행에 걸쳐서 배치되게 한다.
          flex-wrap: wrap;
          @media (min-width: 800px) {
            flex-direction: column;
          }
          .link {
            font-size: 16px;
            font-weight: 500;
            color: #fff;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 32px;
      color: #fff;
      align-items: center;
      flex-direction: column;
      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }
    p {
      margin-top: auto;
    }
  }
}
</style>