const container = document.getElementById("posts-row");
const searchInput = document.getElementById("search-input")

let allPosts = [];

async function getPost() {
    try {
        const response = await fetch("http://localhost:3000/api/posts");
        const data = await response.json();


        if (!response.ok) {
            throw new Error("error");
        }
        allPosts = data;
        renderPosts(allPosts)
       

    } catch (error) {
        console.log(error.message);
    }

    container.addEventListener("click", async (event) => {

        if (!event.target.dataset.id) {
            return;
        }

        const postId = event.target.dataset.id;

        window.location.href = `./post.html?id=${postId}`;
    });
}

getPost();


function renderPosts (posts) {

    container.innerHTML = ""
    posts.forEach((post) => {
        let imageHtml= "";


        if(post.cover_image){
            imageHtml = `<img src="${post.cover_image}" class="card-img-top" alt ="${post.title}">`;

        }

        const createdDate = new Date(post.created_at);
        
        const formattedDate = createdDate.toLocaleDateString("en-IN",{
            day: "numeric",
            month: "long",
            year: "numeric"
        })

        const card = `
                <div class="col-12 col-md-6 col-lg-4">
                <article class="card h-100 d-flex flex-column shadow-sm rounded-3">
                    ${imageHtml}

                    <div class="card-body">
                        <h5 class="card-title mb-3">${post.title}</h5>

                        <p class="card-text mb-3">${post.content}</p>

                        <button
                            class="btn btn-primary mt-auto px-4"
                            data-id="${post.id}">
                            View More
                        </button>
                    </div>

                    <div class="card-footer">
                        <p class="text-muted">Category: ${post.category}</p>
                        <p class="text-muted">Author: ${post.author}</p>
                        <p class="text-muted">Created: ${formattedDate}</p>
                    </div>
                </article>
            </div>
        `;

        container.innerHTML += card;
    });
}

searchInput.addEventListener("input" , () => {

    const searchTerm = searchInput.value.toLowerCase().trim()
    const filteredPosts = allPosts.filter((post) => {
        const searchableText = `
        ${post.title || ""}
        ${post.content || ""}
        ${post.category || ""}
        ${post.author || ""}
        `.toLowerCase();

        return searchableText.includes(searchTerm)
    })

    renderPosts(filteredPosts);

})
        


