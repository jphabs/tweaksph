document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
});

// ✅ Load Posts from Firestore
function loadPosts() {
    const db = firebase.firestore();
    const postsContainer = document.getElementById("blog-posts");

    postsContainer.innerHTML = `<p class="text-center text-gray-500">⏳ Loading blog posts...</p>`;

    db.collection("posts")
        .where("status", "==", "published")
        .orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
            postsContainer.innerHTML = ""; // Clear loading message

            if (querySnapshot.empty) {
                postsContainer.innerHTML = `<p class="text-center text-gray-500">📭 No blog posts available.</p>`;
                return;
            }

            let output = "";
            querySnapshot.forEach((doc) => {
                let post = doc.data();
                let postDate = post.timestamp ? new Date(post.timestamp).toLocaleString() : "Unknown Date";

                output += `
                    <div class="post p-4 border rounded bg-gray-50 shadow mb-4">
                        ${post.image ? `<img src="${post.image}" class="w-full h-48 object-cover rounded mb-2" loading="lazy" alt="${post.title}">` : ""}
                        <h2 class="text-xl font-bold text-gray-800">${post.title}</h2>
                        <p class="text-sm text-gray-500">📅 ${postDate}</p>
                        <p class="text-gray-600">${truncateText(post.content, 150)}</p>
                        <button onclick="viewFullPost('${doc.id}')" class="text-blue-500 mt-2">Read More</button>
                    </div>
                `;
            });

            postsContainer.innerHTML = output;
        })
        .catch((error) => {
            console.error("❌ Error loading posts:", error);
            postsContainer.innerHTML = `<p class='text-red-500'>❌ Failed to load posts. Please try again.</p>`;
        });
}

// ✅ Truncate Text for Post Previews
function truncateText(text, maxLength) {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// ✅ View Full Post (Redirect using Firestore ID)
function viewFullPost(postId) {
    window.location.href = `fullpost.html?id=${postId}`;
}