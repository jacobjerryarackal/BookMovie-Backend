import AdminModels from "../models/admin.js";



export const createAdmin = async (req, res) => {
  try {
    const adminData = new AdminModels(req.body);
    const { email, password } = adminData;

    const existingAdmin = await AdminModels.findOne({  email, password });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = await adminData.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const fetchAdmin = async (req,res) =>{
    try {
        const admin = await AdminModels.findOne();
        if (!admin) {
            return res.status(404).json({ message: 'No admin found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
}

export const updateAdmin = async (req, res) => {
    try {
        const adminData = new AdminModels(req.body);
        const { email, password } = adminData;

        const admin = await AdminModels.findOne( {email, password} );
        if (!admin) {
            return res.status(404).json({ message: 'No admin found' });
        }

        const updatedAdmin = await admin.save();
        res.json(updatedAdmin);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error." });
    }
}

export const deleteAdmin = async (req, res) => {
    try {
        const adminData = new AdminModels(req.body);
        const { email, password } = adminData;

        const admin = await AdminModels.findOne({email,password});
        if (!admin) {
            return res.status(404).json({ message: 'No admin found' });
        }

        await admin.deleteOne({email,password});
        res.json({ message: 'Deleted Admin' });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
}