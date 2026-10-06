

const saveToken = sessionStorage.getItem("adminToken");

if (!saveToken) {
    window.location.href = "admin.html";
}


// PROFILE dropdown---

const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");

profileBtn.addEventListener("click", () => {

    if (profileDropdown.style.display === "block") {

        profileDropdown.style.display = "none";

    } else {

        profileDropdown.style.display = "block";

    }

});



// Logout

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {

    sessionStorage.removeItem("adminToken");

    window.location.href = "admin.html";

});



// ELEMENTS

const postsContainer =
    document.getElementById("posts-container");



const addPostBtn =
    document.getElementById("add-post-btn");

const postsBtn = document.getElementById("posts-btn")    





// ADD POST BUTTON

addPostBtn.addEventListener("click", () => {

    window.location.href = "admin-add-post.html";

});

postsBtn.addEventListener("click" , () => {

    getPosts()
})


// GET Posts

async function getPosts() {

    try {

        const response = await fetch(
            "http://localhost:3000/api/posts",
            {
                headers: {
                    "Authorization": `Bearer ${saveToken}`
                }
            }
        );


        const data = await response.json();


        if (!response.ok) {

            console.log(data.message);

            return;
        }


        postsContainer.innerHTML = "";


        data.forEach((post) => {

            const row = document.createElement("tr");


            row.innerHTML = `
                <td>${post.title}</td>

                <td>${post.author}</td>

                <td>${new Date(post.created_at).toLocaleDateString()}</td>

                <td>${post.category}</td>

                <td>${post.status}</td>

                <td>

                    <button
                        class="edit-btn"
                        data-id="${post.id}">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        data-id="${post.id}">
                        Delete
                    </button>

                </td>
            `;


            postsContainer.appendChild(row);

        });


    } catch (error) {

        console.log(error);

    }

}





// edit + delete

postsContainer.addEventListener("click", async (event) => {


    // edit

    if (event.target.classList.contains("edit-btn")) {

        const postId =
            event.target.getAttribute("data-id");

          window.location.href =`admin-edit-post.html?id=${postId}`  


        return;

    }


    // delete

    if (event.target.classList.contains("delete-btn")) {

        const postId =
            event.target.getAttribute("data-id");


        const confirmDelete = confirm(
            "Are you sure you want to delete this post?"
        );


        if (!confirmDelete) {
            return;
        }


        try {

            const response = await fetch(
                `http://localhost:3000/api/admin/posts/${postId}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization": `Bearer ${saveToken}`
                    }
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(data.message);

                return;
            }


            alert(data.message);

            getPosts();


        } catch (error) {

            console.log(error);

            alert("Delete failed");

        }

    }

});





// LOAD posts.........

getPosts();