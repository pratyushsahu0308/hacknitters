import express from "express";
const router = express.Router();

import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser } from "../controllers/userController.js";

    import { protect, admin } from '../middleware/authMiddleware.js';
    

    router.route('/').post(registerUser).get(protect, admin, getUsers);
    router.post('/auth', authUser);
    router.post('/logout', logoutUser);
    router
      .route('/profile')
      .get(getUserProfile)
      .put(updateUserProfile);
    router
      .route('/:id')
      .delete(protect, admin, deleteUser)
      .get(getUserById)
      .put(updateUser);

export default router;