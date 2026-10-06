const saveToken = sessionStorage.getItem("adminToken");




if(!saveToken){
    window.location.href = "admin.html";

}

// get post id from url

const params = new URLSearchParams(window.location.search);

const postId = params.get("id");

const editform = document.getElementById("edit-form");

const editMessage = document.getElementById("edit-message")



async function getPost (){
    try{
        const response = await fetch(`http://localhost:3000/api/admin/posts/${postId}`,
            {
                headers: {
                    "Authorization": `Bearer ${saveToken}`
                }
            }
        )
        const post = await response.json()

        if(!response.ok){
            console.log(post.message);
            return;
        }
        
        document.getElementById("edit-id").value = post.id;

        document.getElementById("edit-title").value = post.title;

        document.getElementById("edit-slug").value = post.slug;

        document.getElementById("edit-content").value = post.content;

        document.getElementById("edit-image").value = post.cover_image || "";

        document.getElementById("edit-status").value = post.status;

        document.getElementById("edit-category").value = post.category_id;
        


    }catch(error){
        console.log(error);
        
    }
}

// update post
editform.addEventListener("submit", async (event) => {

    event.preventDefault();

    const title = document.getElementById("edit-title").value;

    const slug = document.getElementById("edit-slug").value;

    const content = document.getElementById("edit-content").value;

    const cover_image = document.getElementById("edit-image").value;

    const status = document.getElementById("edit-status").value;

    const category_id = document.getElementById("edit-category").value;

    try{

        const response = await fetch(`http://localhost:3000/api/admin/posts/${postId}`,
            {
                method:"PATCH",
                headers:{
                    "content-type": "application/json",
                    "Authorization": `Bearer ${saveToken}`
                },

                body: JSON.stringify({
                    title,
                    slug,
                    content,
                    cover_image,
                    status,
                    category_id
                })
            }
        )
        const data = await response.json();

        if(!response.ok){

            editMessage.textContent = data.message;

            return;
        }

        editMessage.textContent = data.message;
    }catch(error){
        console.log(error);

        editMessage.textContent = "Failed to update post";
        
        
    }
})

getPost()
