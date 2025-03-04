function loadBlogPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let output = "";
    posts.forEach(post => {
        output += `<div class="post">
            <h2>${post.title}</h2>
            <p>${post.content}</p>
        </div>`;
    });
    document.getElementById("blog-posts").innerHTML = output;
}

document.addEventListener("DOMContentLoaded", loadBlogPosts);
