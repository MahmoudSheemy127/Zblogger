const User = require('../models/user')

const followUser = (req,res) =>
{
    //user id
    console.log(req.user)
    const {id} = req.params
    
    //update the followers array in the followed user doc
    User.findByIdAndUpdate(id,{
        $push:{followers: req.user._id}
    },(err,data) => {
        if(err)
        {
            res.status(500).send("Error With Database");
        }
        else
        {            
            //update the following array in the current user
            User.findByIdAndUpdate(req.user._id,{
                $push:{following: id}
            },(err,data) => {
                if(err)
                {
                    res.status(500).send("Error With Database");
                }
                else
                {
                    res.send("Success");           
                }
            })

        }
    })

}


const unfollowUser = (req,res) => {
    const {id} = req.params

    //update the followers array in the followed user doc
    User.findByIdAndUpdate(id,{
        $pull: {followers: req.user._id}
    },{new:true},(err,data) => {
        if(err)
        {
            res.status(500).send("Error With Database");
        }
        else
        {
            //update the followed array in the current user
            User.findByIdAndUpdate(req.user._id,{
                $pull: {following: id}
            },(err,data) => {
                if(err)
                {
                    res.status(500).send("Error With Database");
                }
                else
                {
                    res.send("Success");           
                }
            })

           
        }
    })
}

module.exports = {followUser,unfollowUser}