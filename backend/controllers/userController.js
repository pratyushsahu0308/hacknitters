import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from 'nodemailer';

const authUser = asyncHandler(async(req,res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
  
    if (user && await (user.matchPassword(password))) {
        generateToken(res, user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });


const registerUser = asyncHandler(async(req,res) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
  }
});


const logoutUser = asyncHandler(async(req,res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: 'Logged out successfully' });
    }
)

const getUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        res.status(200).json ({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
        })
    } else {
        res.status(401);
      
      }
})

const updateUserProfile = asyncHandler(async(req,res) => {

    let mailTransporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port:465,
      auth:{
          user: "resumebook.medicaps@gmail.com",
          pass: "xihxnykueijflsgz"
      }
  })
  
  let details = {
      from: "resumebook.medicaps@gmail.com",
      to: `${req.body.email}`,
      subject: `Wellcome to ResumeBook ${req.body.name}`,
      text: `Your OTP for creating account on ResumeBook is  ${req.body.password}`
  }
  
  mailTransporter.sendMail(details,(err) => {
      if(err){
          console.log("error ", err)
      }
      else {
          console.log("email has sent!")
      }
  })
    res.status(200).json({
    })

console.log(req.body)
})

const getUsers = asyncHandler(async(req,res) => {
    const users = await User.find({});
    res.status(200).json(users);
})

const getUserById = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);

    if(user) {



res.status(200).json(user);
      
    } else {
      res.status(404);
      throw new Error('User not found');
    }
    console.log(req.body)
})

const deleteUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);

    if(user) {
      if(user.isAdmin) {
        res.status(400);
        throw new Error('Cannot delete admin user');
      }
      await User.deleteOne({ _id: user._id})
      res.status(200).json({message: 'User deleted succesfully'});
    }else {
      res.status(404);
      throw new Error('User not found')
    }
})

const updateUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);

    if(user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}