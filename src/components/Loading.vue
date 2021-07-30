<template>
<div class="loading">
    <span></span>
</div>
</template>
<script>
export default {
    name: 'loading',
}
</script>
<style lang="scss" scoped>
.loading {
  top: 0;
  z-index: 101;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  //요쇼를 일반적인 문서 흐름에서 제거하고, 페이지 레이아웃에 공간도 배정하지 않는다.
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  //css애니메이션에서 가장 중요한 요소는 @keyframes이다.
  //@keyframes는 css 문법 중 하나로 애니메이션이 만들어지는 부분이다.
  //@keyframes를 타임 라인 안에 하나의 스테이지(구간)들 이라고 생각하자
  //@keyframes 안에서 스테이지들을 정의하고 각 구간마다 다른 스타일을 적용 시킬 수 있다.
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 3px solid transparent;
    border-top-color: #fff;
    border-bottom-color: #fff;
    border-radius: 50%;
    //infinite이 없으면 한 번 돌고 멈춘다 infinite을 선언함으로써 영원히 돔
    //한 바퀴 도는데 1초 걸리게 1000ms 설정
    animation: spin ease 1000ms infinite;
  }
}
</style>