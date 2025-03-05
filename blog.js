function loadBlogPosts() {
    const db = firebase.firestore();
    const postsContainer = document.getElementById("blog-posts");

    db.collection("posts")
        .where("status", "==", "published") // Fetch only published posts
        .orderBy("timestamp", "desc") // Order by latest posts
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                postsContainer.innerHTML = "<p class='text-gray-500 text-center'>No blog posts available.</p>";
                return;
            }

            let output = "";
            querySnapshot.forEach((doc) => {
                let post = doc.data();
                output += `
                    <div class="post bg-white p-4 rounded-lg shadow-lg mb-4">
                        <h2 class="text-xl font-bold mb-2">
                            <a href="fullpost.html?id=${doc.id}" class="text-blue-500 hover:underline">
                                ${post.title}
                            </a>
                        </h2>
                        <p class="text-gray-600">${truncateText(post.content, 100)}</p>
                    </div>`;
            });

            postsContainer.innerHTML = output;
        })
        .catch((error) => {
            console.error("❌ Error loading blog posts:", error);
            postsContainer.innerHTML = `<p class="text-red-500 text-center">❌ Failed to load posts. Please try again.</p>`;
        });
}

// ✅ Truncate long content for preview
function truncateText(text, maxLength) {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

document.addEventListener("DOMContentLoaded", loadBlogPosts);