const express = require("express");
const bodyParsor = require("body-parser");
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParsor.urlencoded({ extended: false }));
app.use(bodyParsor.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken")

mongoose.connect(
    "mongodb+srv://anaszia:anas@cluster0.74nnraq.mongodb.net/",
    // "mongodb://http://127.0.0.1:8000/register",
    // {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }
).then(() => {
    console.log("connected to mongodb")
}).catch((err) => {
    console.log('error in connecting mongodb', err)
})

app.listen(port, () => {
    console.log("server running on port 8000")
})

const User = require("./models/user");
const Message = require("./models/message");
// const { Alert } = require("react-native");
//Function to create a token for the user
// const createToken=(userId)=>{
//set token payload
// const payload={
//     userId:userId,
// }
//Generate a token with a secret key and expiration time
// const token=jwt.sign(payload,"bikenumberis",{expiresIn:"2d"});
// return token;
// }

//endpoints for the registerusers
app.post("/register", (req, res) => {
    const { name, email, password, image } = req.body;
    //create new user object
    const newUser = new User({ name, email, password, image })
    //save the user to the database
    newUser.save().then(() => {
        try {

            res.json({
                message: "user Registered Successfully"
            })
        } catch (err) {

            console.log("error in registering user", err)
            res.json({
                message: "error registering the user!"
            })
        }
    })
})


//endpoints for the login users
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ massage: "email and Password are required" });
    }
    console.log(User)
    User.findOne({ email }).then((user) => {
        if (!user) {
            //user not found
            return res.status(404).json({ massage: "user not found" })
        }
        if (user.password !== password) {
            //password does not match
            return res.status(404).json({ message: "Invalid Password!" })
        }
        // else if (!user=="undefined"){
        console.log(user)
        const token = user._id;
        res.status(200).json({
            token,
            id: user._id
        })
        // }
    }).catch((err) => {
        res.status(404).json({ message: "error in internal server", err })
    });
})

//endpoints to access all the user exept the user who iis currently loggedin

app.get('/users/:userId', (req, res) => {
    const loggedInUserId = req.params.userId;
    User.find({ _id: { $ne: loggedInUserId } }).then((users) => {
        res.status(200).json(users)
    }).catch((err) => {
        console.log("error in retrieving users", err)
        res.status(500).json({ massage: "error retrieving users" })
    })
})
//endpoints to send a request to a user

app.post("/friend-request", async (req, res) => {
    const { currentUserId, selectedUserId } = req.body
    try {
        //update receipient friend request array
        await User.findByIdAndUpdate(selectedUserId, {
            $push: { friendRequests: currentUserId }
        })
        //update sender friend request array
        await User.findByIdAndUpdate(currentUserId, {
            $push: { sendFriendRequests: selectedUserId }
        })
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
})
//end points to show all the friendsrequest of a particular user
app.get("/friend-request/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        //fetch kr lain gy userdocument ko is userid ki base pr
        const user = await User.findById(userId).populate("friendRequests").exec();
        const friendRequests = user.friendRequests
        res.json(friendRequests);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" });
    }
})
//endpoints to accpt a friend request of a particular person

app.post("/friend-request/accept", async (req, res) => {
    try {
        const { senderId, recepientId } = req.body;
        //retrieve the sender and receipient documents
        const sender = await User.findById(senderId)
        const recepient = await User.findById(recepientId);
        sender.friends.push(recepientId);
        recepient.friends.push(senderId)
        //update the send and friend request of both users who send and receive requst
        sender.sendFriendRequests = sender.sendFriendRequests.filter((abc) => {

            return  abc.toString() !== recepientId.toString()
        })
        recepient.friendRequests =  sender.friendRequests   .filter((abc) =>{
            return abc.toString() !== senderId.toString();
        })
        await sender.save()
        await recepient.save();
        res.status(200).json({ message: "Friend Request accepted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" });
    }

})