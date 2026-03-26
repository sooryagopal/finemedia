const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");


// Register Admin
exports.registerAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    await Admin.create({ email, password });

    res.status(201).json({
      message: "Admin created successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Login Admin
exports.loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
