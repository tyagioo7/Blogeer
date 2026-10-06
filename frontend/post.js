const postDetail = document.getElementById("post-detail")
const params = new URLSearchParams(window.location.search)
const postId = params.get("id")


async function getPost() {

    try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`)


        const data = await response.json()

        console.log(data);
        


        if (!response.ok) {
            throw Error("failed to fetch the post")
        }
        //console.log(data);
        // console.log(data.cover_image);
        let imageHtml = ""
        if (data.cover_image) {
            imageHtml = `<img src = "${data.cover_image}"class = "card-image-top rounded-3 shadow-sm" alt ="${data.title}">`
        }

        const createdDate = new Date(data.created_at)
        const formattedDate = createdDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })

        postDetail.innerHTML = `
            <article class = "card shadow-sm rounded-3">
                ${imageHtml}
                <div class = "card-body">

                <h2 class= "card-title">${data.title}</h2>
                <p>${data.content}</p>
                <p>Category:${data.category}</p>
                <p>Author:${data.author}</p>
                <p>Created:${formattedDate}</p>
            </article>
        `

    } catch (error) {
        console.log(error.message);

        postDetail.innerHTML = `
            <p>${error.message}</p>`


    }


}
getPost()