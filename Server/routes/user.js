import express from "express";
import {getUserBioData, updateUserBioData, deleteUser, createUser, getUserBioDataSingle} from '../controllers/userContoller.js'
const router = express.Router({mergeParams: true})

router.get("/user/:user_id", getUserBioData)

router.get("/username/:user_name", getUserBioDataSingle)

router.post("/updateUser", updateUserBioData)

router.post("/createUser", createUser)

router.delete("/deleteUser:userData", deleteUser)

export default router