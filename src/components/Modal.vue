<template>
    <div class="modal">
        <div class="modal-content">
            <p>{{this.modalMessage}}</p>
            <button @click="closeModal">Close</button>
        </div>
    </div>
</template>
<script>
export default {
    //props를 설정해서 메시지가 여기에 들어오게 되고 
    //위의 template의 this.modalMessage에 전달되어 내용을 띄우게 된다.
    props:["modalMessage"],
    methods:{
        closeModal(){
            //부모 컴포넌트는 자식 컴포넌트가 사용되는 템플릿에서
            //직접 v-on을 사용하여 자식 컴포넌트에서 보내진
            //이벤트를 청취할 수 있다.$emit은 다른 컴포넌트에게
            //이벤트를 전달하기 위해 사용할 수 있다. v-pn으로 받는데
            //지금 현재 이건 ForgotPassword.vue에서 v-on으로 받고 있다.
            this.$emit("close-modal");
        },
    },
}
</script>
<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;
    p {
      text-align: center;
    }
    button {
      align-self: center;
    }
  }
}
</style>