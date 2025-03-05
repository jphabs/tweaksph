document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
});

// ✅ Load Posts from Firestore
function loadPosts() {
    const db = firebase.firestore();
    const postsContainer = document.getElementById("blog-posts");

    db.collection("posts").where("status", "==", "published").orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                postsContainer.innerHTML = `<p class="text-center text-gray-500">No blog posts available.</p>`;
                return;
            }

            let output = "";
            querySnapshot.forEach((doc) => {
                let post = doc.data();
                output += `
                    <div class="post p-4 border rounded bg-gray-50 shadow">
                        ${post.image ? `<img src="${post.image}" class="w-full h-48 object-cover rounded mb-2" loading="lazy" alt="${post.title}">` : ""}
                        <h2 class="text-xl font-bold text-gray-800">${post.title}</h2>
                        <p class="text-gray-600">${truncateText(post.content, 100)}</p>
                        <button onclick="viewFullPost('${doc.id}')" class="text-blue-500 mt-2">Read More</button>
                    </div>
                `;
            });

            postsContainer.innerHTML = output;
        })
        .catch((error) => {
            console.error("Error loading posts:", error);
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