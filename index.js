document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
});

// ✅ Load Only Published Blog Posts
function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let output = "";

    if (posts.length === 0) {
        output = `<p class="text-gray-500">No blog posts available.</p>`;
    } else {
        posts.forEach((post) => {
            if (post.status === "published") { // Only show published posts
                output += `
                    <div class="post p-4 border rounded bg-gray-50 shadow">
                        <h2 class="text-xl font-bold text-gray-800">${post.title}</h2>
                        <p class="text-gray-600">${post.content}</p>
                    </div>
                `;
            }
        });
    }

    document.getElementById("blog-posts").innerHTML = output;
}