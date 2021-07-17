<template>
  <header>
    <nav class="container">
        <div class="branding">
            <!-- 왜 이런 식으로 name를 해서 'Home'설정을 해줬냐면
            router에 index.js에서 path를 고치게 될때 이렇게 안 하면 일일히
            연관된 파일에 다 고쳐줘야 하니까 한거다 -->
            <router-link class="header" :to="{name: 'Home'}">FireBlogs</router-link>
        </div>
        <div class="nav-links">
            <!--mobile이 false이면 사이즈가 750이 넘어간다 그러면 아래를 보여준다.-->
            <!--사이즈가 750 이하면 네비게이션 바가 없어지고 메뉴 아이콘이 생김.-->
            <ul v-show="!mobile">
                <router-link class="link" to="#">Home</router-link>
                <router-link class="link" to="#">Blogs</router-link>
                <router-link class="link" to="#">Create Post</router-link>
                <router-link class="link" to="#">Login/Register</router-link>
            </ul>
        </div>
    </nav>
    <!--메뉴 아이콘을 클릭하면 toggleMobileNav 함수 호출 -->
    <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile"/>
    <transition name="mobile-nav">
        <ul class="mobile-nav" v-show="mobileNav">
            <router-link class="link" to="#">Home</router-link>
            <router-link class="link" to="#">Blogs</router-link>
            <router-link class="link" to="#">Create Post</router-link>
            <router-link class="link" to="#">Login/Register</router-link>
        </ul>
    </transition>
  </header>
</template>

<script>
import menuIcon from '../assets/Icons/bars-regular.svg';
export default {
    name: 'navigation',
    components:{
        menuIcon
    },
    data(){
        return{
            mobile: null,
            mobileNav: null,
            windowWidth:null,
        };
    },
    //컴포넌트가 생성되면 실행
    created(){
        //addEventListener는 이벤트를 등록하는 가장 권장되는 방식이다.
        //첫 번째 파라미터로 이벤트 종류를 넣는데 resize는 document view의 크기가 변경될 때 발생
        //window 객체는 웹 브라우저의 창(window)을 나타내는 객체이다.
        window.addEventListener('resize',this.checkScreen);
        this.checkSreen();
    },
    methods:{
        checkScreen(){
            this.windowWidth=window.innerWidth;
            if(this.windowWidth<=750){
                this.mobile=true;
                return ;
            }
            this.mobile=false;
            this.mobileNav=false;
            return;
        },

        toggleMobileNav(){
            this.mobileNav=!this.mobileNav;
        }
    }
};
</script>

<!--scoped는 style이 이 파일 내에서만 적용된다는 것이다.  -->
<!--여기에 원래 style lang="scss" 있어야됨 -->
<style lang="scss" scoped>
header{
    background-color: #fff;
    padding: 0 25px;
    /*bow shadow가 두개 있는 형태이다*/
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    /*z-index: index값이 큰 요소가 작은 값의 요소 위를 덮는다*/
    z-index: 99;
    .link {
        font-weight: 500;
        //margin: [margin-top=margin-bottom] [margin-left = margin-right];
        padding: 0 8px;
        /*transition이 일어나는 지속 시간명시, 속성을 서서히 변화시키는 속성이다
        ease: 느리게 시작했다가 빨라졌다 다시 느려지는 것
        즉 색깔 color에 0.3초 걸리는 변화를 주는 것*/
        transition: .3s color ease;

        //아래는 .link:hove{#1eb8b8}과 같다. &는 셀렉터로 치환된다. 즉 .link로 치환된다.
        //hover: 사용자가 포인팅 장치를 사용해 상호작용 중인 요소를 선택한다. 보통 사용자의
        //커서(마우스 포인터)가 요소 위에 올라가 있으면 선택된다. 
        &:hover{
            color: #1eb8b8;
        }
    }
    //nav 태그 안에 있는 branding과 header
    nav{
        display: flex;
        padding: 25px 0;
        .branding{
            //요소를 어떻게 보여줄지를 결정
            display:flex;
            //세로 축을 기준으로 정렬한다.
            align-items:center;

            .header{
                font-weight:600;
                font-size: 24px;
                color: #000;
                //글씨의 장식(선) 색을 지정한다.
                text-decoration:none ;
            }
        }

        .nav-links{
            position: relative;
            //플렉스 컨테이너 생성, 내용물의 width 만큼 가로 방향으로 배치
            //자신이 가진 내용물의 width 만큼만 차지하게된다. height는 
            //컨테이너의 높이만큼 늘어난다.
            display:flex;
            //flex-grow를 의미하며 옆으로 자라게한다. 음수는 들어갈 수 없음
            flex:1;
            align-items:center;
            //가로 축을 기준으로 좌우에 대한 정렬을 관장한다.
            //flex-end는 요소들을 컨테이너의 우측으로 정렬
            justify-content: flex-end;

            ul{
                margin-right: 32px;

                .link{
                    margin-right:32px;
                }
                //.link의 마지막 태그는 margin-right:0를 적용
                .link:last-child{
                    margin-right: 0;
                }
            }
        }
    }
    
    .menu-icon{
        //손가락으로 포인팅하는 모양의 마우스 아이콘이다.
        cursor: pointer;
        //relative가 static인 상태를 기준으로 주어진 픽셀만큼 움직였다면
        //absolute는 position:static 속성을 가지고 있지 않은 부모를 기준으로 움직인다.
        position: absolute;
        top: 32px;
        right: 25px;
        height: 25px;
        //height와 width가 auto로 지정된 절대 위치 지정 요소는 자신의 콘텐츠에 맞춰 크기가 바뀐다.
        width: auto;
        //35:00
    }
    .mobile-nav{
        padding: 20px;
        width: 70%;
        max-width:250px;
        //플렉스 컨테이너 생성
        display: flex;
        //플렉스 컨테이너에서세로로 방향을 바꾼다.
        flex-direction: column;
        //스크롤되어도 움직이지 않는 고정된 자리를 가지게 된다.
        position: fixed;
        height: 100%;
        background-color:#303030;
        top:0;
        left:0;

        .link{
            padding: 15px 0;
            color: #fff;
        }
    }

    //지금 콤마를 찍어서 enter-active와 leave-active에 transition를 적용한 것이다.
    .mobile-nav-enter-active,
    .mobile-nav-leave-active{
        transition: all 1s ease;
    }
    //https://kr.vuejs.org/v2/guide/transitions.html 참고
    .mobile-nav-enter{
        //transform 속성으로 요소에 회전, 크기 조절, 기울이기, 이동효과를 부여할 수 있다.
        //translateX는 x좌표를 기준으로 좌우를 움직이는데 이때 음수면 왼쪽 양수면 오른쪽으로 움직임
        transform: translateX(-250px);
    }
    .mobile-nav-enter-to{
        transform: translateX(0);
    }
    .mobile-nav-leave-to{
        transform: translateX(-250px);
    }

}
/*현재 App.vue에 글로벌 형태로 선언되어 있다 하지만 몇가지 조정을 하려고 한다.*/

</style>

