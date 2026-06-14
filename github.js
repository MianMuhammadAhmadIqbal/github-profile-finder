
let usernameInput = document.getElementById("usernameInput");
let searchBtn = document.getElementById("searchBtn");
let profileCard = document.getElementById("profileCard");
let error = document.getElementById("error");
let avatar = document.getElementById("avatar");
let name = document.getElementById("name");
let username = document.getElementById("username");
let bio = document.getElementById("bio");
let followers = document.getElementById("followers");
let following = document.getElementById("following");
let repos = document.getElementById("repos");
let profileLink = document.getElementById("profileLink");


async function fetchProfile(user) {
  try {
    let response = await fetch(`https://api.github.com/users/${user}`);

    if (response.status === 404) {
      profileCard.style.display = "none";
      error.style.display = "block";
      return;
    }

    let data = await response.json();

    // Hide error show card
    error.style.display = "none";
    profileCard.style.display = "block";

    // Fill in data
    avatar.src = data.avatar_url;
    name.textContent = data.name || "No name provided";
    username.textContent = `@${data.login}`;
    bio.textContent = data.bio || "No bio provided";
    followers.textContent = data.followers;
    following.textContent = data.following;
    repos.textContent = data.public_repos;
    profileLink.href = data.html_url;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}


searchBtn.addEventListener("click", function () {
  let user = usernameInput.value.trim();

  if (user === "") {
    alert("Please enter a username!");
    return;
  }

  fetchProfile(user);
});


usernameInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
