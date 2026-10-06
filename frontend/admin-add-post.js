


const saveToken = sessionStorage.getItem("adminToken")

if (!saveToken) {
    window.location.href = "admin.html";
}


const addPostForm = document.getElementById("add-post-form")

const addPostMessage = document.getElementById("add-post-message")


addPostForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const title = document.getElementById("post-title").value;

    const slug = document.getElementById("post-slug").value;

    const content = document.getElementById("post-content").value;

    const coverImage = document.getElementById("post-image").value;

    const status = document.getElementById("post-status").value;

    const category_id = document.getElementById("post-category").value;

    const user_id = document.getElementById("post-userId").value
 



    try{
        const response = await fetch("http://localhost:3000/api/admin/posts",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${saveToken}`

                },
                body: JSON.stringify({
                    title,
                    slug,
                    content,
                    cover_image: coverImage,
                    status,
                    category_id,
                    user_id
                })
            }
        ) 

        const data = await response.json()

        if(!response.ok){
            console.log(data.message);
            
        }

        console.log(data.message);
        
    }catch(error){
        console.log(error);
        
    }
})