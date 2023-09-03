let mainElem = document.querySelector(".main");
let inputElem = document.querySelector("#userinput");
let btnElem = document.querySelector("#btn");

async function gitUser() {
  let getName = inputElem.value;
  let fetchApi = await fetch(`https://api.github.com/users/${getName}`);
  let data = await fetchApi.json();
  return data;
}

let displayUserData = () => {
  btnElem.addEventListener("click", async (e) => {
    try {
      let user = await gitUser();
      console.log(user);
      let cardDiv = document.createElement("div");
      cardDiv.classList = "container w-50 p-4 mx-auto";
      cardDiv.innerHTML = `<div class="row">
          <div class="col-sm-2">
              <div class="gitImg">
                  <img src="${user.avatar_url}" alt="">
              </div>
          </div>
          <div class="col-sm-10 text-white">
              <p class="username">${user.login}</p>
              <div class="otherDetails ">
                  <ul class="d-flex justify-content-between">
                      <li>followers: ${user.followers}</li>
                      <li class="item">following: ${user.following}</li>
                      <li class="item">location: ${user.location || 'N/A'}</li>
                  </ul>
              </div>
              <div class="otherDetails1">
                  <ul class="d-flex justify-content-between ">
                  <li><a class="profileUrl" href="${user.html_url}" target="_blank"><span class="text-white">profile: </span> ${user.html_url}</a></li>
                      <li class="item1">repository: ${user.public_repos}</li>
                  </ul>
              </div>
          </div>
        </div>`;
      mainElem.innerHTML = ''; 
      mainElem.appendChild(cardDiv);
    } catch (error) {
      console.error(error);
    }
  });

  inputElem.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      btnElem.click();
    }
  });
};

displayUserData();
