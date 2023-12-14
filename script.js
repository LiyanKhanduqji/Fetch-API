// Main variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

// Get Repos Function
function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "<span>Please Write Github Username</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((repositries) => {
        // Empty The Container
        reposData.innerHTML = "";

        repositries.forEach((repo) => {
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);

          // Craete Repo URL Anchor
          let theURL = document.createElement("a");

          // Create Repo URL Text
          let theUrlText = document.createTextNode("Visit");

          // Append The Repo URL Text to Anchor Tag
          theURL.appendChild(theUrlText);

          // Add the HyperText Reference href
          theURL.href = `https://github.com/${theInput.value}/${repo.name}`;

          // Set Attribute Blank to open new page
          theURL.setAttribute("target", "_blank");
          mainDiv.appendChild(theURL);

          // Create Stars Count Text
          let starsSpan = document.createElement("span");

          // Craete The Stars Count Text
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );

          // Add Stars Count Text To Stars Span
          starsSpan.appendChild(starsText);

          // Append Stars Count Span To Main Div
          mainDiv.appendChild(starsSpan);

          // Add Class On Main Div
          mainDiv.className = "repo-box";
          reposData.appendChild(mainDiv);
        });
      });
  }
}
