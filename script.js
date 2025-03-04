document.addEventListener("DOMContentLoaded", function () {
    checkAuth();
    loadAdminPosts();
});

// ✅ Save New Post (Published or Draft)
function savePost(status = "published") {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let imageInput = document.getElementById("image");

    if (!title || !content) {
        alert("Title and content are required!");
        return;
    }

    if (imageInput.files.length > 0) {
        let file = imageInput.files[0];
        convertToWebP(file).then((webpData) => {
            storePost(title, content, webpData, status);
        });
    } else {
        storePost(title, content, "", status);
    }
}

// ✅ Convert Image to WebP (Reduces Size)
function convertToWebP(file) {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            let img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL("image/webp", 0.8)); // 80% quality
            };
        };
    });
}

// ✅ Store Post in LocalStorage
function storePost(title, content, image, status) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push({ title, content, image, status });
    localStorage.setItem("posts", JSON.stringify(posts));

    alert(status === "draft" ? "Draft saved!" : "Post published!");
    location.reload();
}

// ✅ Load Posts in Admin Panel
function loadAdminPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let output = posts.length === 0 ? `<p class="text-center text-gray-500">No posts yet.</p>` : "";

    posts.forEach((post, index) => {
        output += `
            <div class="post p-4 border rounded bg-gray-50 shadow">
                ${post.image ? `<img src="${post.image}" class="w-full h-40 object-cover rounded mb-2">` : ""}
                <h2 class="text-lg font-bold">${post.title}</h2>
                <p class="text-gray-700">${post.content}</p>
                <p class="text-sm text-gray-500">Status: ${post.status}</p>
                <div class="flex space-x-2 mt-2">
                    <button onclick="editPost(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                    <button onclick="deletePost(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </div>
            </div>`;
    });

    document.getElementById("admin-posts").innerHTML = output;
}

// ✅ Edit Post
function editPost(index) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = posts[index];

    document.getElementById("title").value = post.title;
    document.getElementById("content").value = post.content;

    // Preserve Image
    document.getElementById("saveButton").innerHTML = `
        <button onclick="updatePost(${index})" class="w-full bg-green-500 text-white p-2 rounded">Update Post</button>`;
}

// ✅ Update Post
function updatePost(index) {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts[index] = { title, content, image: posts[index].image, status: "published" };
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("Post updated!");
    location.reload();
}

// ✅ Delete Post
function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("Post deleted!");
    location.reload();
}

// ✅ Admin Login System
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