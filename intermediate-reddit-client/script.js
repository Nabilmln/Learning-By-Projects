const input = document.getElementById("subredditInput");
const addBtn = document.getElementById("addBtn");
const lanes = document.getElementById("lanes");

let subreddits = JSON.parse(localStorage.getItem("subreddits")) || [];

window.addEventListener("DOMContentLoaded", loadSavedSubreddits);

addBtn.addEventListener("click", addSubreddit);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addSubreddit();
  }
});

async function addSubreddit() {
  const subreddit = input.value.trim();

  if (!subreddit) {
    return;
  }

  if (subreddits.includes(subreddit)) {
    alert("Subreddit already exists");
    return;
  }

  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);

    if (!response.ok) {
      throw new Error();
    }
    console.log(response);
    const data = await response.json();
    console.log(data);

    subreddits.push(subreddit);

    saveSubreddits();

    renderLane(subreddit, data);

    input.value = "";
  } catch {
    alert("Subreddit not found");
  }
}

function saveSubreddits() {
  localStorage.setItem("subreddits", JSON.stringify(subreddits));
}

async function loadSavedSubreddits() {
  for (const subreddit of subreddits) {
    try {
      const response = await fetch(
        `https://www.reddit.com/r/${subreddit}.json`,
      );

      const data = await response.json();

      renderLane(subreddit, data);
    } catch (error) {
      console.log(error);
    }
  }
}

function renderLane(subreddit, data) {
  const lane = document.createElement("div");

  lane.classList.add("lane");

  lane.innerHTML = `
        <div class="lane-header">

            <strong>
                r/${subreddit}
            </strong>

            <div class="lane-buttons">
                <button class="refresh-btn">
                    Refresh
                </button>

                <button class="delete-btn">
                    Delete
                </button>
            </div>

        </div>

        <div class="posts"></div>
    `;

  const postsContainer = lane.querySelector(".posts");

  renderPosts(postsContainer, data);

  const deleteBtn = lane.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", () => {
    subreddits = subreddits.filter((s) => s !== subreddit);

    saveSubreddits();

    lane.remove();
  });

  const refreshBtn = lane.querySelector(".refresh-btn");

  refreshBtn.addEventListener("click", async () => {
    postsContainer.innerHTML = `<div class="loading">Loading...</div>`;

    try {
      const response = await fetch(
        `https://www.reddit.com/r/${subreddit}.json`,
      );

      const data = await response.json();

      renderPosts(postsContainer, data);
    } catch {
      postsContainer.innerHTML = `<div class="error">
                        Failed to load
                    </div>`;
    }
  });

  lanes.appendChild(lane);
}

function renderPosts(container, data) {
  container.innerHTML = "";

  data.data.children.forEach((post) => {
    const postData = post.data;

    const div = document.createElement("div");

    div.classList.add("post");

    div.innerHTML = `
                <div class="post-title">
                    ${postData.title}
                </div>

                <div class="post-meta">
                    👍 ${postData.ups}
                    •
                    u/${postData.author}
                </div>
            `;

    container.appendChild(div);
  });
}
