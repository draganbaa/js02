document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const input = document.querySelector("input");
  console.log(input.value);
});
