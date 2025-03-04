document.addEventListener("DOMContentLoaded", function () {
    checkAuth();
    loadAdminPosts();
});

// ✅ Firebase Authentication Check
function checkAuth() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            document.getElementById("loginScreen").classList.add("hidden");
            document.getElementById("adminPanel").classList.remove("hidden");
        } else {
            document.getElementById("loginScreen").classList.remove("hidden");
            document.getElementById("adminPanel").classList.add("hidden");
        }
    });
}

// ✅ Save New Post (Published or Draft)
function savePost(status = "published") {
    let title = document.getElementById("title").value.trim();
    let content = document.getElementById("content").value.trim();
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

// ✅ Convert Image to WebP (Optimized)
function convertToWebP(file) {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = (event) => {
            let img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL("image/webp", 0.8));
            };
        };
        reader.readAsDataURL(file);
    });
}

// ✅ Store Post in Firebase Firestore
function storePost(title, content, image, status) {
    let user = firebase.auth().currentUser;
    if (!user) return alert("You must be logged in!");

    firebase.firestore().collection("posts").add({
        title,
        content,
        image,
        status,
        author: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
        alert(status === "draft" ? "Draft saved!" : "Post published!");
        loadAdminPosts();
    })
    .catch((error) => {
        console.error("Error saving post:", error);
    });
}

// ✅ Load Admin Posts from Firestore
function loadAdminPosts() {
    firebase.firestore().collection("posts").orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
        let output = snapshot.empty 
            ? `<p class="text-center text-gray-500">No posts yet.</p>` 
            : "";

        snapshot.forEach((doc) => {
            let post = doc.data();
            let postId = doc.id;
            output += `
                <div class="post p-4 border rounded bg-gray-50 shadow">
                    ${post.image ? `<img src="${post.image}" class="w-full h-40 object-cover rounded mb-2">` : ""}
                    <h2 class="text-lg font-bold">${post.title}</h2>
                    <p class="text-gray-700">${post.content}</p>
                    <p class="text-sm text-gray-500">Status: ${post.status} | Author: ${post.author}</p>
                    <div class="flex space-x-2 mt-2">
                        <button onclick="editPost('${postId}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                        <button onclick="deletePost('${postId}')" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </div>
                </div>`;
        });

        document.getElementById("admin-posts").innerHTML = output;
    });
}

// ✅ Edit Post
function editPost(postId) {
    firebase.firestore().collection("posts").doc(postId).get()
    .then((doc) => {
        if (doc.exists) {
            let post = doc.data();
            document.getElementById("title").value = post.title;
            document.getElementById("content").value = post.content;

            document.getElementById("saveButton").innerHTML = `
                <button onclick="updatePost('${postId}')" class="w-full bg-green-500 text-white p-2 rounded">Update Post</button>`;
        }
    })
    .catch((error) => {
        console.error("Error fetching post:", error);
    });
}

// ✅ Update Post
function updatePost(postId) {
    let title = document.getElementById("title").value.trim();
    let content = document.getElementById("content").value.trim();

    firebase.firestore().collection("posts").doc(postId).update({
        title,
        content,
    })
    .then(() => {
        alert("Post updated!");
        loadAdminPosts();
    })
    .catch((error) => {
        console.error("Error updating post:", error);
    });
}

// ✅ Delete Post
function deletePost(postId) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    firebase.firestore().collection("posts").doc(postId).delete()
    .then(() => {
        alert("Post deleted!");
        loadAdminPosts();
    })
    .catch((error) => {
        console.error("Error deleting post:", error);
    });
}

// ✅ Admin Logout
function logout() {
    firebase.auth().signOut()
    .then(() => {
        alert("Logged out!");
    })
    .catch((error) => {
        console.error("Logout failed:", error);
    });
}