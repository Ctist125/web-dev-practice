// 상수 및 변수 선언
const signUpForm = document.getElementById("signup-form");

// 회원가입 api 연결 함수
function signUp(event) {
  // form 제출 막기
  event.preventDefault();

  // 데이터 값 읽어오기
  const newUser = {
    newId: document.getElementById("new-id").value,
    newPw: document.getElementById("new-pw").value,
    pwCheck: document.getElementById("pw-check").value,
  };

  fetch("http://localhost:3000/api/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...newUser }),
  })
    .then((res) => {
      if (!res.ok) {
        location.href = "/auth-page/400.html";
        return;
      }

      return res.json();
    })
    .then((data) => {
      if (data.errorMessage) {
        document.querySelector(".error").innerHTML = data.errorMessage;
        document.getElementById("new-pw").value = "";
        document.getElementById("pw-check").value = "";
      } else {
        alert(data.message);
        location.href = "/auth-page/login.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// event listener
signUpForm.addEventListener("submit", signUp);
