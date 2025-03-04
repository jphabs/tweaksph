document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
});

// ✅ Load Only Published Blog Posts
function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let output = "";

    let publishedPosts = posts.filter((post) => post.status === "published");

    if (publishedPosts.length === 0) {
        output = `<p class="text-center text-gray-500">No blog posts available.</p>`;
    } else {
        publishedPosts.forEach((post) => {
            output += `
                <div class="post p-4 border rounded bg-gray-50 shadow">
                    ${post.image ? `<img src="${post.image}" class="w-full h-48 object-cover rounded mb-2" loading="lazy">` : ""}
                    <h2 class="text-xl font-bold text-gray-800">${post.title}</h2>
                    <p class="text-gray-600">${truncateText(post.content, 100)}</p>
                    <button onclick="viewFullPost('${encodeURIComponent(post.title)}')" class="text-blue-500 mt-2">Read More</button>
                </div>
            `;
        });
    }

    document.getElementById("blog-posts").innerHTML = output;
}

// ✅ Truncate Text for Post Previews
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// ✅ View Full Post (Opens in New Page or Modal)
function viewFullPost(title) {
    alert("Opening full post: " + decodeURIComponent(title));
    // You can redirect to a detailed post page or open a modal
}