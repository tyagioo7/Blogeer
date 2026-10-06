import db from "../config/db.js"


export const getPosts = async (req, res) => {
    try {
        const [posts] = await db.query(`
            SELECT
                posts.id,
                posts.category_id,
                posts.title,
                posts.slug,
                posts.content,
                posts.cover_image,
                posts.status,
                posts.created_at,
                posts.updated_at,
                users.name As author,
                categories.name As category,
                tags.name As tag
            FROM posts
            JOIN users
                ON posts.user_id = users.id
            JOIN categories
                ON posts.category_id = categories.id
            LEFT JOIN post_tags
                ON posts.id = post_tags.post_id
            LEFT JOIN tags
                ON post_tags.tag_id = tags.id
            `)
        res.json(posts)
    } catch (error) {
        console.log(error);

    }
}


export const getPostById = async (req, res) => {
    try {
        const [posts] = await db.query(`
            SELECT
                posts.id,
                posts.category_id,
                posts.title,
                posts.slug,
                posts.content,
                posts.cover_image,
                posts.status,
                posts.created_at,
                posts.updated_at,
                users.name As author,
                categories.name As category,
                tags.name As tag
            FROM posts
            JOIN users
                ON posts.user_id = users.id
            JOIN categories
                ON posts.category_id = categories.id
            LEFT JOIN post_tags
                ON posts.id = post_tags.post_id
            LEFT JOIN tags
                ON post_tags.tag_id = tags.id
                WHERE posts.id = ?
        `, [req.params.id]);

        if (posts.length === 0) {
            return res.status(404).json({
                message: "Post not found"
            })
        }
        console.log(posts[0]);
        
        res.json(posts[0])
    } catch (error) {
        console.log(error);


        res.status(500).json({
            message: "Failed to fetch"
        })


    }
}



export const createPost = async (req, res) => {
    try {
        const {
            title,
            slug,
            content,
            cover_image,
            status,
            user_id,
            category_id
        } = req.body

        console.log(req.body);


        if (!title || !slug || !content || !user_id || !category_id) {
            return res.status(400).json({
                message: "Required fields are missing"
            })

        }

        const [result] = await db.query(`
            INSERT INTO posts
            (user_id,category_id,title,slug,content,cover_image,status)
            VALUES (?,?,?,?,?,?,?)`,
            [
                user_id,
                category_id,
                title,
                slug,
                content,
                cover_image,
                status
            ]
        )
        console.log("INSERT", result);
        console.log("POST CREATED", result.insertId);

        res.status(201).json({
            message: "POST CREATED SUCCESSFULLY",
            postID: result.insertId
        })



    } catch (error) {
        console.log(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "SLUG ALREADY EXISTS PLEASE USE A DIFF SLUG"
            })
        }
        res.status(500).json({
            message: "FAILED TO CREATE POST-"

        })

    }
}


export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const {
            title,
            slug,
            content,
            cover_image,
            status,
            category_id
        } = req.body


        const [posts] = await db.query(`
            SELECT id FROM posts WHERE id = ?`,
            [id]
        )

        if (posts.length === 0) {
            return res.status(404).json({
                message: "Page not found"
            })
        }


        const [result] = await db.query(`
            UPDATE posts
            SET
              title = ?,
              slug = ?,
              content = ?,
              cover_image = ?,
              status = ?,
              category_id = ?
             WHERE id = ?`,
            [
                title,
                slug,
                content,
                cover_image,
                status,
                category_id,
                id
            ]
        )
          res.status(200).json({
            message:"POST UPDATED SUCCESSFULLY",
            postID: id
          })
    }catch(error){
        console.log(error);


        if(error.code === "ER_DUP_ENTRY"){
            return res.status(409).json({
                message: "SLUG ALREADY EXITS TRY DIFF SLUG"
            })
        }

        res.status(500).json({
            message: "Failed to update post"
        })
        
    }
}


export const deletePost = async (req,res) => {
    try{
        const { id }= req.params

       const [result] = await db.query(
        "DELETE FROM posts WHERE id = ?",
        [id]
       )

       if(result.affectedrows === 0){
        return res.status(404).json({
            message: "post not found"


        })
       }

       res.status(200).json({
        message:"POST deleted successfully"
       })
    }catch(error){
        console.log(error);

        res.status(500).json({
            message: "Failed to delete post"
        })
        
    }

}