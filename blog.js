function loadBlogPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let output = "";

    if (posts.length === 0) {
        output = "<p class='text-gray-500 text-center'>No blog posts available.</p>";
    } else {
        posts.forEach((post, index) => {
            output += `
                <div class="post bg-white p-4 rounded-lg shadow-lg mb-4">
                    <h2 class="text-xl font-bold mb-2">
                        <a href="fullpost.html?index=${index}" class="text-blue-500 hover:underline">
                            ${post.title}
                        </a>
                    </h2>
                    <p class="text-gray-600">${post.content.substring(0, 100)}...</p>
                </div>`;
        });
    }

    document.getElementById("blog-posts").innerHTML = output;
}

document.addEventListener("DOMContentLoaded", loadBlogPosts);