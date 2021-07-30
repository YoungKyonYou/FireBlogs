  <template>
  <div class="reset-password">
        <!--
            부모 컴포넌트는 자식 컴포넌트가 사용되는 템플릿에서
            직접 v-on을 사용하여 자식 컴포넌트에서 보내진
            이벤트를 청취할 수 있다.$emit은 다른 컴포넌트에게
            이벤트를 전달하기 위해 사용할 수 있다. v-pn으로 받는데
            지금 현재 이건 Modal.vue에서 emit를 통해 전달해주고 있다.
            v-on:close-modal은 Modal.vue에서 emit한 것이다. 즉
            Modal에서 close 버튼이 눌리면 여기 ForgotPassword.vue에 
            등록된 closeModal 메서드가 호출된다. 
            -->
        <!--여기 modalMessage는 Modal.vue의 props와 연결된다.-->
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <email class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>
<script>
import email from "../assets/Icons/envelope-regular.svg"
import Modal from "../components/Modal"
import Loading from "../components/Loading"
import firebase from "firebase/app"
import "firebase/auth"
export default {
    name: 'ForgotPassword',
    components: {email,Modal,Loading}, 
    data() {
        return {
            email: "",
            modalActive:false,
            modalMessage: "",
            loading: null,
        };
    },
    methods: {
    resetPassword() {
      this.loading = true;
      firebase
        .auth()
        //여기 this.email은 위에 data()에 있는 email이다.
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalMessage = "If your account exists, you will receive a email";
          this.loading = false;
          this.modalActive = true;
        })
        .catch((err) => {
          this.modalMessage = err.message;
          this.loading = false;
          this.modalActive = true;
        });
    },
    closeModal() {
      this.modalActive = !this.modalActive;
      //모달을 close하면 email를 빈 문자열로 초기화한다.
      this.email = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>