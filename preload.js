const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".submit-button");

  btn.addEventListener("click", () => {
    let title = document.querySelector(".title");
    let url = document.querySelector(".url");
    let desc = document.querySelector(".description");
    let category = document.querySelector(".category");
    let src = document.querySelector(".image-source");
    let date = document.querySelector(".date");
    let titleVal = `{
        name: "${title.value}",
        url:"${url.value}",
        description:"${desc.value}",
        category:"${category.value}"
        imageSource:"${src.value}",
        date:"${date.value}"
    }`;
    ipcRenderer.send("saveText", titleVal);
  });
});
