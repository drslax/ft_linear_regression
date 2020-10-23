const newForm = document.querySelector(".frm");
const regOp = document.querySelectorAll("option");

newForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(regOp[newForm.regType.selectedIndex].value);
});
