import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (name, email, password) => {
    
    if(!name || !email || !password){
        throw new Error("Please provide all fields");
    }  
    const existingUser = await User.findOne({ email });
    if(existingUser){
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword});

    const token= generateToken(user._id);
    return {user, token};
}

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const generateToken = async (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
}

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
