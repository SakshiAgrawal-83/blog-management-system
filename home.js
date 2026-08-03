async function loadBlogs() {

    try {

        const response = await fetch("/blogs");
        const data = await response.json();

        const container = document.getElementById("blogContainer");

        container.innerHTML = "";

        if (data.blogs.length === 0) {
            container.innerHTML = "<p>No blogs available.</p>";
            return;
        }

        data.blogs.forEach(blog => {

            container.innerHTML += `
                <article class="blog-card">

                    <div class="card-header">

                    <h3>${blog.title}</h3>

                    <div class="buttons">

                        <button class="edit-btn" onclick="editBlog(${blog.id})">
                            Edit
                        </button>

                        <button class="delete-btn" onclick="deleteBlog(${blog.id})">
                            Delete
                        </button>

                    </div>

                </div>

                <p><strong>Author:</strong> ${blog.author}</p>

                <p><strong>Category:</strong> ${blog.category}</p>

                <p>${blog.content}</p>
                </article>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// Redirect to Edit Page
function editBlog(id) {

    window.location.href = `addBlog.html?id=${id}`;

}

// Delete Blog
async function deleteBlog(id) {

    const confirmDelete = confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`/blogs/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        alert(data.message);

        loadBlogs();

    } catch (error) {

        console.error(error);

    }

}

loadBlogs();