function savePost(status = "published") {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    if (!title || !content) {
        alert("Title and content required!");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push({ title, content, status });
    localStorage.setItem("posts", JSON.stringify(posts));
    alert(status === "draft" ? "Draft saved!" : "Post published!");
    location.reload();
}

function loadAdminPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let output = "";
    posts.forEach((post, index) => {
        output += `<div class="post p-4 border rounded">
            <h2 class="text-lg font-bold">${post.title}</h2>
            <p class="text-gray-700">${post.content}</p>
            <p class="text-sm text-gray-500">Status: ${post.status}</p>
            <button onclick="editPost(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
            <button onclick="deletePost(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>`;
    });
    document.getElementById("admin-posts").innerHTML = output;
}

function editPost(index) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = posts[index];

    document.getElementById("title").value = post.title;
    document.getElementById("content").value = post.content;

    document.getElementById("saveButton").innerHTML = `<button onclick="updatePost(${index})" class="w-full bg-green-500 text-white p-2 rounded">Update Post</button>`;
}

function updatePost(index) {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts[index] = { title, content, status: "published" };
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("Post updated!");
    location.reload();
}

function checkLogin() {
    let password = document.getElementById("password").value;
    if (password === "admin123") {
        localStorage.setItem("isLoggedIn", "true");
        location.reload();
    } else {
        alert("Wrong password!");
    }
}

function checkAuth() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("adminPanel").classList.remove("hidden");
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    location.reload();
}

document.addEventListener("DOMContentLoaded", checkAuth);