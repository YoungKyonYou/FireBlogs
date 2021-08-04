<template>
    <div class="profile">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <div class="admin-badge">
          <adminIcon class="icon" />
          <span>admin</span>
        </div>
        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="userName" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "../components/Modal";
import adminIcon from "../assets/Icons/user-crown-light.svg"
export default {
    name: "Profile",
    components: {
        Modal,
        adminIcon
    }, 
    data() {
        return {
            modalMessage: "Changes were saved!",
            //modalActive은 true or false 값을 갖는데
            //true이면 modal이 pop out 된다. 지금 null로 한다는 것은 false이다. 
            modalActive: null,
        };
    },
    methods:{
        updateProfile(){
            //store의 index.js에 actions 안에 updateUserSettings가 정의되어 있다.
            this.$store.dispatch("updateUserSettings");
            this.modalActive=!this.modalActive;
        },
        //모달이 나타났을 때 close로 닫아주기 위한 함수
        closeModal(){
            this.modalActive=!this.modalActive;
        },
    },
    computed:{
        firstName:{
            get(){
                //프로파일 view에 들어가면 First Name input 칸에 로그인한 First Name이 들어감
                return this.$store.state.profileFirstName;
            },
            //set으로 유저가 타이핑하는 것을 받는다.
            //mutation으로 store에 있는 state 값을 바꿔주려면 commit 해줘야 한다.
            set(payload){
                this.$store.commit("changeFirstName", payload);
            }
        },
        lastName:{
            get(){
                //프로파일 view에 들어가면 Last Name input 칸에 로그인한 Last Name이 들어감
                return this.$store.state.profileLastName;
            },
            //set으로 유저가 타이핑하는 것을 받는다.
            //mutation으로 store에 있는 state 값을 바꿔주려면 commit 해줘야 한다.
            set(payload){
                this.$store.commit("changeLastName", payload);
            }
        },
        userName:{
            get(){
                //프로파일 view에 들어가면 User Name input 칸에 로그인한 User Name이 들어감
                return this.$store.state.profileUsername;
            },
            //set으로 유저가 타이핑하는 것을 받는다.
            //mutation으로 store에 있는 state 값을 바꿔주려면 commit 해줘야 한다.
            set(payload){
                this.$store.commit("changeUserName", payload);
            },
        },
        email(){
            return this.$store.state.profileEmail;
        }
    }

};
</script>

<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;
    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }
    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;
      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;
        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }
      .input {
        margin: 16px 0;
        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        align-self: center;
      }
    }
  }
}
</style>