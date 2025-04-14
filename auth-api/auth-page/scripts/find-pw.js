// 상수 및 변수 선언
const findPwForm = document.getElementById("find-id-form");

// 함수 선언
function findPw(event) {
  // form 제출 멈춤
  event.preventDefault();

  // 데이터 값 받아오기
  const inputId = document.getElementById("user-id").value;

  fetch("http://localhost:3000/api/find-pw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputId: inputId }),
  })
    .then((res) => {
      if (!res.ok) {
        location.href = "/auth-page/400.html";
        return;
      }

      return res.json();
    })
    .then((data) => {
      if (data.status) {
        alert(`비밀번호: ${data.userPw}`);
        return (location.href = "/auth-page/login.html");
      } else {
        document.querySelector(".error").innerHTML = data.errorMessage;
        document.getElementById("user-id").value = "";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// event listener
findPwForm.addEventListener("submit", findPw);
