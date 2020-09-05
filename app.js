let form = document.getElementById("main-form");
let profile = document.getElementById("profile");
let search = document.getElementById("search");

const API_URL = "https://api.github.com/users/";

async function getUser(user) {
	let resp = await fetch(API_URL + user);
	let resData = await resp.json();

	createProfile(resData);
	createRepos(user);
}

async function createRepos(user) {
	let resp = await fetch(API_URL + user + "/repos");
	let resData = await resp.json();

	addToRepos(resData);
}

function createProfile(user) {
	let card = `
        <div class="imgContainer">
            <img src=${user.avatar_url} alt=${user.name} class="profileImg" />
        </div>
        <div class="content"> 
            <h4>${user.name}</h4>
            <p>${user.bio} </p>
            <ul> 
                <li> <strong> Followers: </strong>${user.followers} </li>
                <li><strong> Following: </strong> ${user.following}</li>
                <li><strong> Repos: </strong>${user.public_repos}</li>
            </ul>
        </div>

    `;
	profile.innerHTML = card;
}
function addToRepos(repos) {
	let reposEl = document.getElementById("repos");
	repos
		.sort((a, b) => b.stargazers_count - a.stargazers_count)
		.slice(0, 9)
		.map((repo) => {
			let repoEl = document.createElement("a");
			repoEl.classList.add("repo");
			repoEl.href = repo.html_url;
			repoEl.target = "_blank";
			repoEl.innerText = repo.name;

			reposEl.appendChild(repoEl);
		});
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let user = search.value;
	if (user) {
		getUser(user);
		search.value = "";
	}
});
