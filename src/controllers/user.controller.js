import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/schema/user.schema.js";
import CommonRepository from "../models/repository/common.repository.js";

class UserController {
  
  constructor() {
    this.commonRepository = new CommonRepository();
  }

  // 1. User Registration
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await this.commonRepository.findbyEmail(userModel,email);
      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: `${email} email already registered with us!`,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const userData = { name, email, password: hashedPassword };
      const result = await this.commonRepository.create(userModel, userData);

      if (result) {
        return res
          .status(201)
          .json({ status: true, message: "User Created Successfully!" });
      } else {
        return res
          .status(400)
          .json({ status: false, message: "User creation failed" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  }


  // 2. Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. check if email found or not
      const emailExist = await this.commonRepository.findbyEmail(
        userModel,
        email
      );
      if (emailExist) {
        // Match the password
        const match = await bcrypt.compare(password, emailExist.password);
        if (match) {
          const token = jwt.sign(
            {
              userId: emailExist._id,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
          );

          return res.status(200).json({ status: true, token: token });
        } else {
          return res
            .status(400)
            .json({ status: false, message: "Invalid Credentials" });
        }
      } else {
        return res
          .status(400)
          .json({ status: false, message: "Invalid Credentials" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  }

}

export default UserController;
