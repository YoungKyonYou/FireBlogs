//firebase만 써도 되지만 필요없는 라이브러리까지 포함함으로 app으로 제한한다.
import firebase from "firebase/app";
//필요 없는 것을 없애 준다. 위에 import와 순서가 바뀌면 안됨
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCXsNGaA2wDr7vbxEI37tVCEr-oOeiD26c",
  authDomain: "fireblogs-b21fa.firebaseapp.com",
  projectId: "fireblogs-b21fa",
  storageBucket: "fireblogs-b21fa.appspot.com",
  messagingSenderId: "696194012257",
  appId: "1:696194012257:web:88385c292f0ce401014620",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

//export는 이 변수를 내보내겠다는 것이다.  즉 다른 파일에서 가져다 쓸
//변수나 함수의 앞에 export라는 키워드를 붙인다. export된 파일은 import로 불러온다.
export { timestamp };

//export default는 다른 파일에 있는 내용을 참조 해 오기 위한 방식이다.
//https://joshua1988.github.io/web-development/translation/essential-es6-features-for-vuejs/ 참고
export default firebaseApp.firestore();
