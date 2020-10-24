const newForm = document.querySelector(".frm");
const regOp = document.querySelectorAll("option");
const learningRate = document.querySelector("#myRange");

newForm.addEventListener("submit", (e) => {
  e.preventDefault();
  draw(regOp[newForm.regType.selectedIndex].value);
});

newForm.addEventListener("change", (e) => {
  e.preventDefault();
  if (regOp[newForm.regType.selectedIndex].value === "least") {
    learningRate.setAttribute("disabled", "");
  }
});
