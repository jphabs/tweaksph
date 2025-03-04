function savePost() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    if (!title || !content) {
        alert("Title and content required!");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push({ title, content, status: "published" });
    localStorage.setItem("posts", JSON.stringify(posts));
    alert("Post saved!");
    location.reload();
}

function loadAdminPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let output = "";
    posts.forEach((post, index) => {
        output += `<div class="post">
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <button onclick="deletePost(${index})">Delete</button>
        </div>`;
    });
    document.getElementById("admin-posts").innerHTML = output;
}

function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    alert("Post deleted!");
    loadAdminPosts();
}

document.addEventListener("DOMContentLoaded", loadAdminPosts);
