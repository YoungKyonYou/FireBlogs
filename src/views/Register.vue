<template>
     <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Already have an accout?
                <router-link class="router-link" :to="{name: 'Login'}">Login</router-link>
            </p>
            <h2>Create Your FireBlog Account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="First Name" v-model="firstName"/>
                    <user class="icon"/>
                </div>
                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="lastName"/>
                    <user class="icon"/>
                </div>
                <div class="input">
                    <input type="text" placeholder="Username" v-model="username"/>
                    <user class="icon"/>
                </div>
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
            <!--아래 metho에 선언된 register 메서드가 호출된다
            click.prevent는 현재 이벤트의 기본 동작을 중단한다.
            즉 그 이벤트의 디폴트 액션이 발생하지 않는다. 
            예를 들어 form에서 submit button을 눌러도 event.preventDefault()와
            함께라면 submit액션은 일어나지 않는다. -->
            <button @click.prevent="register">Sign Up</button>
            <div class="angle"></div>
        </form>
        <div class="background">

        </div>
    </div>
</template>
<script>
import email from "../assets/Icons/envelope-regular.svg"
import password from "../assets/Icons/lock-alt-solid.svg"
import user from "../assets/Icons/user-alt-light.svg"
import firebase from "firebase/app";
import "firebase/auth"
import db from "../firebase/firebaseInit";
export default {
    name: "register",
    components: {
        email,
        password,
        user,
    }, 
    data() {
        return {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password:"" ,
            error: null,
            errorMsg:"",
        };
    },
    methods: {
    //async는 현재 함수를 비동기로 처리하겠다는 선언이다. 
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.username !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        //await는 비동기로 순차 처리하기 위해서 수행할 API에 붙이는 선언자이다. 
        //await를 사용하며 API 함수에 대한 request를 보내고 다음 문장을 수행하는 것이 아니라
        //request에 대한 reseponse까지 모두 다 받은 다음에 다음 문장을 수행한다. 
        const firebaseAuth = await firebase.auth();

        //Creates a new user account associated with the specified email address and password
        //제대로 계정이 만들어졌는지 안 만들어졌는지 결과를 createUser 변수에 넣는다.
        //이 과정에서 유니크한 아이디가 생성된다.
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
        
        //이 시점에 유저가 생성된다. 
        //유니크한 아이다가 result에 들어간다. 
        const result = await createUser;

        //컬렉션을 생성해서 거기에 유저 정보들을 담는다.
        //result를 통해 유저의 유니크한 아이디를 넣는다.  
        //이는 firbase 홈페이지에 'Firestore Database'에 들어가면 확인할 수 있다.
        const dataBase = db.collection("users").doc(result.user.uid);

        //위에서 생성한 dataBase에 
        //key value값으로 유저의 정보를 넣는다.
        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
        });

        //회원가입이 완료되면 Home으로 페이지를 전환한다. 
        this.$router.push({ name: "Home" });
        return;
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields!";
      return;
    },
  },
};
</script>
<style lang="scss" scopred>
.register{
    h2{
        max-width:350px;
    }
}
</style>

//2:56:50