// 변수 선언
const basicPageButton = document.getElementById("logo");
const licensePageButton = document.getElementById("license-page");
const fontLicensePageButton = document.getElementById("font-license-page");
const mainIframe = document.querySelector("main iframe");

// 함수 선언
function goToMainPage() {
  mainIframe.src = "../basic-page.html";
}

function goToLicensePage() {
  mainIframe.src = "../license.html";
}

function goToFontLicensePage() {
  mainIframe.src = "../font-license.html";
}

// event
basicPageButton.addEventListener("click", goToMainPage);
licensePageButton.addEventListener("click", goToLicensePage);
fontLicensePageButton.addEventListener("click", goToFontLicensePage);
