<template>
    <div class="form-wrap">
        <form class="login">
            <p class="login-register">
                Don't have an account?
                <router-link class="router-link" :to="{name: 'Register'}">Register</router-link>
            </p>
            <h2>Login to FireBlogs</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email"/>
                    <email class="icon"/>
                </div>
                <div class="input">
                    <input type="password" placeholder="Password" v-model="password"/>
                    <password class="icon"/>
                </div>
                <div v-show="error" class="error">{{this.errorMsg}}</div>
            </div>
            <router-link class="forgot-password" :to="{name: 'ForgotPassword'}">Forgot your password?</router-link>
                <button @click.prevent="signIn">Sign In</button>
                <div class="angle"></div>
        </form>
        <div class="background">
        </div>
    </div>
</template>
<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
//로그인을 구현하기 위한 firebase import
import firebase from "firebase/app";
import "firebase/auth";
export default {
    name: 'Login',
    components: {
        email,
        password,
    }, 
    data() {
        return {
            email:"",
            password: "",
            error:null,
            errorMsg: "",
        };
    },
    methods:{
        signIn(){
            //로그인을 하기위해서 이메일(아이디)와 비밀번호를 넘긴다. 성공하면 Home.vue로 전환된다
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=>{
                this.$router.push({name: "Home"});
                this.error=false;
                this.errorMsg="";
                console.log(firebase.auth().currentUser.uid);
            }).catch(err=>{
                this.error=true;
                this.errorMsg=err.message;
            });
        }
    }
}
</script>
<!--여기서 scope를 안 하는 이유는 이 style를
Register, ForgotPassword에서도 쓸것이기 때문이다. -->
<style lang="scss">
.form-wrap{
    //내용이 넘치면 자른다.
    overflow:hidden;
    //flex container가 되고 자식 요소는 flex item이된다.
    //flex container의 flex-direction 속성을 따로 지정하지 않으면 기본값인 row가 적용된다.
    display:flex;
    height: 100vh;
    justify-content: center;
    //http://www.tcpschool.com/examples/tryit/tryhtml.php?filename=css3_expand_flexbox_15
    //교차축 기준으로 부모 컨테이너 중심에 위치.
    align-self:center;
    margin: 0 auto;
    width: 90%;
    @media(min-width: 900px){
        width: 100%;
    }
    .login-register{
        margin-bottom: 32px;
        .router-link{
            color:#000;
        }
    }
    form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
        @media (min-width: 900px) {
            padding: 0 50px;
        }
        h2{
            text-align: center;
            font-size: 32px;
            color: #303030;
            margin-bottom: 40px;
            @media(min-width: 900px){
                font-size: 40px;
            }
        }
        .inputs{
            width: 100%;
            max-width: 350px;
            .input{
                position: relative;
                display:flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;
                input{
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    padding: 4px 4px 4px 30px;
                    height: 50px;
                    &:focus{
                        outline: none;
                    }
                }
                .icon{
                    width:12px;
                    position: absolute;
                    left: 6px;
                }
            }
        }
        .forgot-password{
            text-decoration: none;
            color: #000;
            cursor: pointer;
            font-size: 14px;
            margin: 16px 0 32px;
            border-bottom: 1px solid transparent;
            transition: .5s ease all;
            &hover{
                border-color: #303030;
            }
        }
        .angle {
            display: none;
            position: absolute;
            background-color: #fff;
            transform: rotateZ(3deg);
            width: 60px;
            right: -30px;
            height: 101%;
            @media (min-width: 900px) {
                display: initial;
            }
        }
    }  
    .background{
        display: none;
        flex: 2;
        background-size: cover;
        background-image: url("../assets/background.png");
        width: 100%;
        height: 100%;
        @media(min-width:900px){
            display:initial;
        }
    }
}
</style>
//2:27:41