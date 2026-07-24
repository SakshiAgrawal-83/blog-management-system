const form = document.getElementById("blogForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    document.getElementById("titleError").textContent = "";
    document.getElementById("authorError").textContent = "";
    document.getElementById("categoryError").textContent = "";
    document.getElementById("contentError").textContent = "";
    document.getElementById("successMessage").textContent = "";

    let isValid = true;

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const category = document.getElementById("category").value;
    const content = document.getElementById("content").value.trim();

    if (title === "") {
        document.getElementById("titleError").textContent = "Please enter a blog title.";
        isValid = false;
    }

    if (author === "") {
        document.getElementById("authorError").textContent = "Please enter the author's name.";
        isValid = false;
    }

    if (category === "") {
        document.getElementById("categoryError").textContent = "Please select a category.";
        isValid = false;
    }

    if (content === "") {
        document.getElementById("contentError").textContent = "Please enter blog content.";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("successMessage").textContent = "Blog submitted successfully!";
        form.reset();
    }

});