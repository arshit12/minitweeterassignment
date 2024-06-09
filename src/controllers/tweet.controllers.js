import {Tweet} from '../models/tweet.model';


export const createTweet = async (req, res) => {
    try {
        const {description,id} = req.body;
        if(!description || !id){
            return res.status(400).json({
                message:"all fields are required",
                success:false
            });
        }
        await Tweet.create({
            description,
            user:id
        });
        return res.status(201).json({
            message:"Tweet created successfully",
            success:true
        });
    } catch (error) {
        console.log(error);
    }

};

export const deleteTweet = async (req, res) => {
  try {
    const {id}=req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Tweet deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editTweet = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        if (!description) {
        return res.status(400).json({
            message: "description is required",
            success: false,
        });
        }
        await Tweet.findByIdAndUpdate(id, { description });
        return res.status(200).json({
        message: "Tweet updated successfully",
        success: true,
        });
    } catch (error) {
        console.log(error);
    }
    };