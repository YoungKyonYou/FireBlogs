<template>
    <!--유저가 로그인을 했을 땐 class=no-user 를 쓰지 않는다.-->
    <div class="blog-wrapper" :class="{'no-user':!user}">
        <div class="blog-content">
            <div>
                <!-- Home.vue에 가보면 welcomeScreen이 true로 되어 있다. 즉 h2를 출력함
                여기서 post는 Home.vue에 있는 welcomeScreen의 title이다.--> 
                <h2 v-if="post.welcomeScreen">{{post.title}}</h2>
                <h2 v-else>{{post.title}}</h2>

                <p v-if="post.welcomeScreen">{{post.blogPost}}</p>
                <p class="content-preview" v-else>{{post.blogHTML}}</p>

                <!--Ape.vue에 있는 .link 하고 .link-light style이 적용된다. -->
                <router-link class="link link-light" v-if="post.welcomeScreen" to="#">
                    Login/Register<Arrow class="arrow arrow-light"/>
                </router-link>

                <router-link class="link" v-else  to="#">
                    View The Post<Arrow class="arrow"/>
                </router-link>
            </div>
        </div>
        
        <div class="blog-photo">
            <!--requre(이미지 파일 경로) 이걸 쓰면 경로만 주면 이미지가 들어감
            bind를 써줘야 하는 이유는 이 BlogPost 태그를 쓰는 뷰에서 props로 데이터를 받아오기 때문이다
            그래야 아래와 같이 post.photo로 매핑이 가능-->
            <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt=""/>
            <img v-else :src="require(`../assets/blogPhotos/${post.blogCoverPhoto}.jpg`)" alt=""/>
        </div>
    </div>
</template>
<script>
import Arrow from "../assets/Icons/arrow-right-light.svg"
export default {
    name: "blogPost",
    props: ["post"],
    components: {
        Arrow,
    },
    computed:{
        user(){
        //true or false를 반환
            return this.$store.state.user;
        },
    }
};
</script>

<style lang="scss" scoped>

.blog-wrapper{
    display: flex;
    flex-direction: column;
    /*x-position : 가로 위치입니다. 양수면 오른쪽에, 음수면 왼쪽에 그림자가 만들어집니다. (필수)
    y-position : 세로 위치입니다. 양수면 아래쪽에, 음수면 위쪽에 그림자가 만들어집니다. (필수)
    blur : 그림자를 흐릿하게 만듭니다. 값이 클 수록 더욱 흐려집니다.
    spread : 양수면 그림자를 확장하고, 음수면 축소합니다.
    color : 그림자 색을 정합니다. 이 형태는 그림자를 복수로 지정한 형태다*/
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    @media(min-width: 700px){
        min-height: 650px;
        max-height: 650px;
        flex-direction: row;
    }
    .blog-content{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items: center;
        flex: 4;
        order: 2;
        @media(min-width: 700px){
            order: 1;
        }
        @media(min-width: 808px){
            flex:3;
        }
        //이렇게 div만 쓸 수 있는 이유, 즉 따로 class 선언
        //해줄 필요가 없는 이유는 .blog-content 안에 div가 
        //하나 밖에 없다.
        div{
            max-width: 375px;
            padding: 72px 24px;
            @media(min-width: 700px){
                padding: 0 24px;
            }

            h2{
                font-size: 32px;
                font-weight: 300;
                text-transform: uppercase;
                margin-bottom: 24px;
                @media(min-width: 700px){
                    font-size: 40px;
                }
            }
            p{
                font-size: 15px;
                font-weight: 300;
                line-height: 1.7;
            }

            .content-preview{
                font-size: 13px;
                max-height: 24px;
                width: 250px;
                //스페이스, 탭, 줄바꿈, 자동줄바꿈을 어떻게 처리해야 할지 정함
                //nowrap: 스페이스와 탭:병합, 줄바꿈: 병합, 자동 줄바꿈: x
                white-space:nowrap;
                //요소내의 컨텐츠가 너무 커서 요소내에 모두 보여주기 힘들 때
                //그것을 어떻게 보여줄지를 지정
                //요소의 크기가 고정되어 있지 않다면 컨텐츠를 모두 포함할 수 있도록 
                //요소의 크기가 커진다. hidden은 넘치는 부분은 잘려서 보여지지 않는다.
                overflow: hidden;
                //박스 안에 내용이 넘칠 때 텍스트 처리하는 속성
                //text-overflow 속성은 2가지를 모두 충족할 경우에만 적용
                //overflow 속성이 hidden, scroll, auto일 때(visible 제외)
                //white-space:nowrap일 때
                //ellipsis는 잘린 텍스트를 생략 부호(...)로 표시한다.
                text-overflow: ellipsis;
            }
            .link{
                //inline-block은 block과 inline의 중간 형태다. 줄 바꿈이 되지 않지만
                //크기를 지정할 수 있다. 요소 자체는 인라인 요소처럼 동작하지만 
                //해당 요소 내부에서는 블록 요소처럼 동작한다. 여기서는 inline-flex를 썻는데
                //즉 플렉스 항목을 인라인으로 표시하는 게 아니라 플렉스 컨테이너 디스플레이를
                //인라인으로 만든다. 
                display:inline-flex;
                align-items: center;
                margin-top: 32px;
                padding-bottom: 4px;
                border-bottom: 1px solid transparent;
                transition: .5s ease-in all;

                &:hover{
                    border-bottom-color: #303030;
                }
            }

            .link-light{
                &:hover{
                    border-bottom-color:#ffff;
                }
            }
        }
    }
    .blog-photo{
        //order은 플렉스 또는 그리드 컨테이너 안에서 현재 요소의 
        //배치 순서를 지정한다.
        order: 1;
        flex: 3;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);

        @media(min-width: 700px){
            order: 2;
        }
        @media(min-width: 800px) {
            //플렉스 값은 옆으로 박스를 늘린다. 수치가 커지면 커질수록
            //가로로 늘어남
            flex: 4;
        }

        img{
            display:block;
            width: 100%;
            height: 100%;
            //<img>나 <video> 요소와 같은 대체 요소의 콘텐츠 크기를 어떤
            //방식으로 조절해 요소에 맞출 것인지 지정한다.
            //cover은 대체 콘텐츠의 가로세로비를 유지하면서, 요소 콘텐츠 박스를 가득 채운다.
            object-fit: cover;
        }
    }


    &:nth-child(even){
        .blog-content{
            order: 2;
        }
        .blog-photo{
            order: 1
        }
    }
}
//:first-child는 형제 요소 중 제일 첫 요소를 나타낸다.
.no-user:first-child{
    .blog-content{
        background-color: #303030;
        color: #fff;
    }
}

</style>

