// var naver_id_login = new naver_id_login("veX3Dz8TuRO6ffBUw5pJ", "http://127.0.0.1:5501/naverlogin.html");
// var state = naver_id_login.getUniqState();
// naver_id_login.setButton("white", 2, 40);
// naver_id_login.setDomain(".service.com");
// naver_id_login.setState(state);
// naver_id_login.setPopup();
// naver_id_login.init_naver_id_login();

// function naverSignInCallback() {
//   alert(naver_id_login.getProfileData('email'));
//   alert(naver_id_login.getProfileData('nickname'));
//   alert(naver_id_login.getProfileData('age'));
// }

// naver_id_login.get_naver_userprofile("naverSignInCallback()");

var naver_id_login = new naver_id_login("veX3Dz8TuRO6ffBUw5pJ", "http://localhost:9000/member/login");
var state = naver_id_login.getUniqState();
naver_id_login.setButton("white", 3, 40);
naver_id_login.setDomain(".service.com");
naver_id_login.setState(state);
naver_id_login.init_naver_id_login();

function naverSignInCallback() {
  var userProfile = {
    email: naver_id_login.getProfileData('email'),
    nickname: naver_id_login.getProfileData('nickname'),
    age: naver_id_login.getProfileData('age'),
    name: naver_id_login.getProfileData('name')
  };
  var jsonUserProfile = JSON.stringify(userProfile);
  console.log(jsonUserProfile);
  
  $.ajax({
  url: 'http://localhost:9000/member/naversignUp',
  type: 'POST',
  data: {
    member_id: naver_id_login.getProfileData('email'),
    member_name: naver_id_login.getProfileData('name'),
    password: '0000',
    birth: '11111111'
  },
  success: function(response) {
    console.log('User info saved successfully');
    window.location.replace("/");
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.error('Error saving user info:', textStatus, errorThrown);
  }
});
    naver_id_login.close();
}

naver_id_login.get_naver_userprofile("naverSignInCallback()");

