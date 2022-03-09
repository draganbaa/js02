document.querySelector(".formOne").addEventListener("submit", function (e) {
  e.preventDefault();

  const sendInput = document.querySelector(".sendInput");
  const message = btoa(sendInput.value);
  url = `${window.location.href}#${message}`;
  //chagning title
  const labelOne = document.querySelector(".labelOne");
  labelOne.innerText = "Link for a Friend or You";
  //changin input to link input
  sendInput.value = url;
  sendInput.select();
});

// document.querySelector(".formTwo").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const reciveInput = document.querySelector(".reciveInput");
//   //decode reciveInput http://127.0.0.1:5500/messages/index.html/aGloaQ==
//   const labelTwo = document.querySelector(".labelTwo");
//   if (reciveInput.value.length >= 42) {
//     let url = reciveInput.value.substring(42);
//     //changing title for user
//     labelTwo.innerText = "Yor message decoded!";
//     //writing decoded message to user
//     reciveInput.value = atob(url);
//   } else {
//     labelTwo.innerText = "Your URL is not valid!";
//   }
// });

const { hash } = window.location;
const message = atob(hash.replace("#", ""));
if (message) {
  const h1 = document.querySelector("h1");
  h1.innerText = message;
  document.querySelector(".message").classList.remove("hidden");
}
