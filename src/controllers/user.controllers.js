import { User } from "../models/users.models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                message: "Username already exists",
                success: false,
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 12);

        await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "User created successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};
export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials please try again",
                success: false,
            });
        }
        const isPassword = await bcryptjs.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false,
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error);
    }
};

export const Logout = async (req, res) => {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "user logged out successfully.",
        success: true
    })
};


export const getMyProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            message: "User fetched successfully",
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
    }
};

export const getOtherProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const otherUsers = await User.find({ _id: { $ne: id } }).select("-password");
        if (!otherUsers) {
            return res.status(400).json({
                message: "No user found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Users fetched successfully",
            success: true,
            otherUsers
        });

    } catch (error) {
        console.log(error);
    }

};
export const follow = async (req, res) => {
    try{
const loggedInUserId = req.body.id;
const userToFollow = req.params.id;
const loggedInUser= await User.findById(loggedInUserId);
const user = await User.findById(userToFollow);
if(!user.followers.includes(loggedInUserId)){
    await user.updateOne({$push:{followers:loggedInUserId}});
    await loggedInUser.updateOne({$push:{following:userToFollow}});
    return res.status(200).json({
        message:"User followed successfully",
        success:true
    });
}
    else{
        return res.status(400).json({
            message:"User already followed",
            success:false
        });
    }
    return res.status(200).json({
        message:`${loggedInUser.name} just follow to ${user.name}`,
        success:true
    });
    }
    catch(error){
        console.log(error);
    }


};
export const unfollow = async (req, res) => {
    try{
        const loggedInUserId = req.body.id;
        const userToUnfollow = req.params.id;
        const loggedInUser= await User.findById(loggedInUserId);
        const user = await User.findById(userToUnfollow);
        if(user.followers.includes(loggedInUserId)){
            await user.updateOne({$pull:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$pull:{following:userToUnfollow}});
            return res.status(200).json({
                message:"User unfollowed successfully",
                success:true
            });
        }
        else{
            return res.status(400).json({
                message:"User already unfollowed",
                success:false
            });
        }
        return res.status(200).json({
            message:`${loggedInUser.name} just unfollow to ${user.name}`,
            success:true
        });
        }
        catch(error){
            console.log(error);
        }
    };























