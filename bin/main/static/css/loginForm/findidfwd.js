let memberId; // memberId 변수를 전역 변수로 선언합니다.

function findPassword() {
  memberId = document.getElementById("member_id").value;
  if (memberId.trim() !== "") {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = xhr.responseText;
          if (response === "true") {
            document.getElementById("questionForm").style.display = "block";
          } else {
            alert("아이디가 존재하지 않습니다.");
          }
        } else {
          alert("서버 오류가 발생했습니다.");
        }
      }
    };
    xhr.open("POST", "findid", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("member_id=" + encodeURIComponent(memberId));
  } else {
    alert("아이디를 입력해주세요.");
  }
}

function checkAnswer() {
  const question = document.getElementById("question").value;
  const answer = document.getElementById("answer").value;

  if (answer.trim() !== "") {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          if (response.success) {
            const password = response.password;
            alert("비밀번호: " + password);
            // 비밀번호를 찾았을 때의 추가 동작을 여기에 작성하세요
          } else {
            alert("질문에 대한 답변이 일치하지 않습니다.");
          }
        } else {
          alert("서버 오류가 발생했습니다.");
        }
      }
    };
    xhr.open("POST", "findfwd", true); // 비밀번호 확인을 위한 API 엔드포인트를 입력하세요
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(
      "member_id=" +
        encodeURIComponent(memberId) +
        "&question=" +
        encodeURIComponent(question) +
        "&answer=" +
        encodeURIComponent(answer)
    );
  } else {
    alert("질문에 대한 답변을 입력해주세요.");
  }
}

