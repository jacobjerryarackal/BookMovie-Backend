import { createAdmin, deleteAdmin, fetchAdmin, updateAdmin } from '../controller/adminController.js';

import express from "express";

const admrouter = express.Router();

admrouter.post ("/", createAdmin); 
admrouter.get("/", fetchAdmin);
admrouter.put("/", updateAdmin);
admrouter.delete("/", deleteAdmin);


export default admrouter;