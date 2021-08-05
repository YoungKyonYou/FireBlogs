const functions = require("firebase-functions");
//requring firebase admin package
const admin = require("firebase-admin");
//initializing
admin.initializeApp();

//start creating functions
exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin!!`,
      };
    })
    .catch((err) => {
      console.log(err);
    });
});


//이것을 디폴로이 할려면 명령어 firebase deploy --only functions 즉
//functions만 디플로이하는 것이다.
//디플로이가 끝나면 파이어베이스 웹의 Functions에 들어가면 함수가 생성된 것을 볼 수 있다.
//addAdminRole함수는 프론트에서 넘겨 이메일을 사용해서 해당 유저를 admin(관리자)으로 만든다.
