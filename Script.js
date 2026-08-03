const form = document.getElementById("blogForm");

const title = document.getElementById("title");
const author = document.getElementById("author");
const category = document.getElementById("category");
const content = document.getElementById("content");
const submitBtn = document.querySelector("button");

// Check if editing
const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

// Load existing blog if editing
if (blogId) {

    submitBtn.textContent = "Update Blog";

    fetch(`/blogs/${blogId}`)
        .then(response => response.json())
        .then(blog => {

            title.value = blog.title;
            author.value = blog.author;
            category.value = blog.category;
            content.value = blog.content;

        })
        .catch(error => console.log(error));

}

// Submit form
form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const blog = {
        title: title.value.trim(),
        author: author.value.trim(),
        category: category.value,
        content: content.value.trim()
    };

    // Validation
    if (
        blog.title === "" ||
        blog.author === "" ||
        blog.category === "" ||
        blog.content === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    const url = blogId ? `/blogs/${blogId}` : "/blogs";

    const method = blogId ? "PUT" : "POST";

    try {

        const response = await fetch(url, {

            method: method,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(blog)

        });

        const data = await response.json();

        alert(data.message);

        window.location.href = "index.html";
    } catch (error) {

        console.log(error);

    }

});