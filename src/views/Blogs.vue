<template>
    <div class="blog-card-wrap">
        <div class="blog-cards container">
            <div class="toggle-edit">
                <span>Toggle Editing Post</span>

                <input type="checkbox" v-model="editPost">
            </div>
            <!--지금 sampleBlogCards는 store에서 데이터를 가져와서 BlogCard 컴포넌트로
            이 데이터를 넘겨주는데 이것은 BlogCard.vue의 props에 정의된 이름으로
            sampleBlogCards의 데이터를 가져와서 사용한다. 그리고 그 컴포넌트를 보여줌
            그리고 :post="post" 부분은 BlogCard.vue에 props에 정의된 post와 바인딩 되는 것이다.
            즉 그 post로 v-for해서 sampleBlogCards의 데이터를 전해준다-->
            <BlogCard :post="post" v-for="(post,index) in sampleBlogCards" :key="index"/>
        </div>
    </div>
</template>
<script>
import BlogCard from "../components/BlogCard";
export default {
    name: "blogs",
    components: {BlogCard}, 
    computed:{
        sampleBlogCards(){
            return this.$store.state.sampleBlogCards;
        },
        //editPost라는 변수를 store에 있는 editPost값으로 get()를 통해 초기화하고
        //이 get으로 초기화된 값을 computed에 쓰인 데이터로 set()를 통해 바꿔준다.
        //get은 생략할 수 있다.
        //결국 computed는 계속 변수를 감시하는 거니까 editPost 값이 바뀌면 이 get() set()이
        //한번에 호출되는 것이다. 
        editPost:{
          get() {
            return this.$store.state.editPost
          },
          //이 set을 통해서 store의 index.js에 mutation에 선언되어 있는 변수의 값을
          //바꾼다.
          set(payload){
            //mutations에 정의된 함수를 commit를 통해서 호출하는 것으로 
            //store의 state에 정의된 변수의 값을 변경할 수 있다. 

            //여기에 toggleEditPost는 store에 index.js에 mutation안에 선언되어 있는
            //toggleEditPost와 이름이 같아야함
            this.$store.commit("toggleEditPost",payload);
          },
        },
    },
    //뷰의 라이프 사이클에서 컴포넌트가 제거 되기 직전에 호출되는 라이프 사이클 훅이다.
    beforeDestroy(){
      this.$store.commit("toggleEditPost",false);
    }

}
</script>
<style lang="scss" scoped>
.blog-cards {
  position: relative;
  .toggle-edit {
    display: flex;
    align-items: center;
    //요소를 일반적인 문서 흐름에서 제거하고, 
    //페이지 레이아웃에 공간도 배정하지 않습니다. 
    //대신 가장 가까운 위치 지정 조상 요소에 대해 상대적으로 배치합니다.
    // 단, 조상 중 위치 지정 요소가 없다면 초기 컨테이닝 블록을 기준으로 삼습니다.
    //최종 위치는 top, right, bottom, left 값이 지정합니다.
    position: absolute;

    //음수면 올라가고 양수면 내려간다.
    top: -80px;
    right: 0;
    span {
      margin-right: 16px;
    
    }

    //위에 input type="checkbox"를 선택한다.
    input[type="checkbox"] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    //:before: 요소의 시작부분에 콘텐츠 추가
    //html에서 input type="checkbox"를 선택하게 된다.
    //이것은 Toggle 버튼의 그 동그라미에 적용된다.
    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 30px;
      top: 0;
      left: 0;
      background: #303030;
      //scale은 요소를 확대 또는 축소할 수 있다.
      //1보다 큰 수는 확대, 1보다 작은 수는 축소이다.
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    //여기서 left가 실질적으로 그 토글 버튼을 움직이게 하는 것이다. 
    //input의 checkbox가 checked되면 즉 클릭되면 발생함
    input:checked[type="checkbox"]:before {
      background: #fff;
      left: 52px;
    }
  }
}
</style>

