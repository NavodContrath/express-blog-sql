const connection = require('../data/db')

//index
function index(req, res) {

    const sql = 'SELECT * FROM posts';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
        console.log(results)
    })
}
//show
function show(req, res) {
    const postId = Number(req.params.id)
    console.log(postId)
    const sql = `SELECT * FROM posts WHERE id=?`
    const sqlJoin = 'SELECT tags.* FROM post_tag JOIN tags ON post_tag.tag_id = tags.id WHERE post_tag.post_id=?'
    connection.query(sql, [postId], (err, postResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (postResults.length === 0) return res.status(404).json({ error: '404', message: 'Data not found' })
        const post = postResults[0]

        connection.query(sqlJoin, [postId], (err, tagResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            console.log(tagResults)
            post.tags = tagResults

            res.json(post);
        })


    })
}
//store
function store(req, res) {
    //creating new object with request body
    const post = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    //add new post to posts arr
    posts.push(post)
    //results
    console.log(posts)
    res.status(201).json(post)
}
//update
function update(req, res) {
    //find post
    const foundPost = posts.find(post => req.params.slug === post.slug)
    //error
    if (!foundPost) {
        return res.status(404).json({
            error: "404 not found",
            message: "post not found"
        })
    }
    //updating post with new values
    foundPost.title = req.body.title
    foundPost.slug = req.body.slug
    foundPost.content = req.body.content
    foundPost.image = req.body.image
    foundPost.tags = req.body.tags
    //results
    console.log(posts)
    res.json(foundPost)
}
//modify
function modify(req, res) {
    res.send(`modify post with slug:${req.params.slug}`)
}
//destroy
function destroy(req, res) {
    const postId = Number(req.params.id)
    const sql = 'DELETE FROM posts WHERE id=?'

    connection.query(sql, [postId], (err) => {
        if (err) return res.status(500).json({ message: 'Database query failed' })
    })
    //response with no content
    res.sendStatus(204)
}
module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy,
}