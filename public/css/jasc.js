function openDialog(dialogId) {
  const x = document.getElementsByClassName(dialogId);
  console.log(x);
  x[0].style.display = "block";
  const y = document.getElementsByClassName("blur");
  y[0].style.display = "block";
}
function closeDialog(dialogId) {
  const x = document.getElementsByClassName(dialogId);
  console.log(x);
  x[0].style.display = "none";
  const y = document.getElementsByClassName("blur");
  y[0].style.display = "none";
}

function closeDialogUpdate(dialogId) {
  const x = document.getElementsByClassName(dialogId);
  console.log(x);
  x[0].style.display = "none";
  const y = document.getElementsByClassName("blur");
  y[0].style.display = "none";
  const z = document.getElementById("updateContainer");
  const computedStyle = window.getComputedStyle(z);
  const displayValue = computedStyle.getPropertyValue("display");
  console.log(displayValue);
  if (displayValue == "none") {
    z.style.display = "flex";
  }
  
   const a = document.getElementsByClassName("ofe2");
  a[0].style.display = "none";
}

async function dialogSubmit(e) {
  console.log(document.querySelector(".ofe1"));
}
