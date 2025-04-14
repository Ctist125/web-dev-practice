// 상수 및 변수 선어
const loginForm = document.getElementById("login-form");

function login(event) {
  // form 전송 멈춤
  event.preventDefault();

  // login 값 받아오기
  const userInput = {
    userId: document.getElementById("user-id").value,
    userPw: document.getElementById("user-pw").value,
  };

  axios
    .post("http://localhost:3000/api/login", { ...userInput })
    .then((res) => {
      if (res.data.loginResult) {
        alert(`${res.data.userId}님 환영합니다.`);
        return (location.href = "/auth-page/login.html");
      } else {
        document.querySelector(".error").innerHTML = res.data.errorMessage;
        document.getElementById("user-pw").value = "";
      }
    })
    .catch((error) => {
      if (error.response.status === 400) {
        location.href = "/auth-page/400.html";
      } else {
        console.log(error);
      }
    });
}

// event listener
loginForm.addEventListener("submit", login);
