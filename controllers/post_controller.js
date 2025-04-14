const posts = require('../data/posts')
const connection = require('../data/db')

//index
function index(req, res) {

    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })
}
//show
function show(req, res) {
    /*  //find post by slug
     const foundPost = posts.find(post => post.slug === req.params.slug)
     //error handler
     if (!foundPost) {
         return res.status(404).json({
             error: "404 not found",
             message: "post not found"
         })
     }
     //return post
     res.json(foundPost) */

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
    //find post by slug
    const foundPost = posts.find(post => post.slug === req.params.slug)
    //error handler
    if (!foundPost) {
        return res.status(404).json({
            error: "404 not found",
            message: "post not found"
        })
    }
    //remove post from the array
    posts.splice(posts.indexOf(foundPost), 1)
    //log posts to verify right functioning
    console.log(posts)
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