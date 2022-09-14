const Comment = require("../models/comment")

const postComment = (req,res) => {
    const data = req.body;
    console.log("Biatch");
    Comment.create(data,(err,data) => {
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

const getComments = (req,res) => {
      Comment.find({},(err,data) => {
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

const getComment = (req,res) => {
    const id = req.params.id;
    console.log("Here");
    Comment.findById(id,(err,data) => {
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



module.exports = {getComments,postComment,getComment}