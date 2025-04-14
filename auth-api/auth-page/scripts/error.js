// 상수 및 변수 선언
const moveButton = document.querySelector(".btn");

// 함수 선언
function previousPage() {
  history.back();
}

// event listener
moveButton.addEventListener("click", previousPage);
