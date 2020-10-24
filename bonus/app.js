const newForm = document.querySelector(".frm");
const regOp = document.querySelectorAll("option");
const learningRate = document.querySelector("#myRange");
const dataMode = document.getElementsByName("dataMode");

newForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var regTypeValue = regOp[newForm.regType.selectedIndex].value;
  selectAlgo(regTypeValue);
});

newForm.addEventListener("change", (e) => {
  e.preventDefault();
  if (regOp[newForm.regType.selectedIndex].value === "least") {
    learningRate.setAttribute("disabled", "");
  }
});
