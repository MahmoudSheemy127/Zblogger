const Blog = require('../models/blog')
const {upload} = require('../utils/S3')


const uploadBlogs = (req,res,next) => {
    console.log(req.file)
    //console.log(req.body)

    //upload cover image
    upload(req.file.filename,(err,data) => {
        if(err)
        {
            res.status(500).send("Error saving file to s3");
        }
        else
        {
            console.log("Data uploaded! ",data)
            //upload blog mongodb doc
            const blog = new Blog({
                ...req.body,
                cover:data.Location
            })             
            blog.save((err,data) => {
                if(err)
                {
                    res.status(500).send("Error saving blog data to db");
                }
                else
                {
                    res.json(data)
                }
            })
        }
    })
    //upload blog with the required detail

    // res.json(req.body)    
    // const blog = new Blog(req.body);
    // blog.save((err,data) => {
    //     if(err)
    //     {
    //         console.log("Error saving doc");
    //         res.status(500).send("Error saving doc in DB")
    //     }
    //     else
    //     {
    //         res.json(data)
    //     }
    // })
}


const getBlogs = (req,res) => {
    
    Blog.find({},(err,data) => {
        if(err)
        {
            res.status(500).send("Error fetching docs from DB")
        }
        else
        {
            res.json(data)
        }
    
    })
}

const getBlog = (req,res) => {
    const id = req.params.id;
    Blog.findById(id,(err,data) => {
      if(err)
      {
        res.status(500).send("Error With Database");
      }
      else
      {
          res.json(data)
      }
  })
}

const updateBlog = (req,res) =>
{
    console.log("Hey yo");
    const {id} = req.params;
    const data = req.body;
    Blog.findByIdAndUpdate(id,data,(err,data) => {
        if(err)
        {
            res.status(500).send("Error With Database");
        }
        else
        {
            res.json(data);
        }
    })

}


module.exports = {uploadBlogs,getBlogs, updateBlog, getBlog}