import { Router } from "express";
import {
  addOwner,
  getAllOwners,
  getOwnerById,
  updateOwner,
  deleteOwner,
} from "../controllers/owner.controller";
import { validateOwner } from "../middlewares/validation.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Owners
 *   description: API endpoints for managing vehicle owners
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Owner:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the owner
 *         name:
 *           type: string
 *           description: Full name of the owner
 *       example:
 *         id: 1
 *         name: Anish Pradhan
 */

/**
 * @swagger
 * /owners:
 *   post:
 *     summary: Create a new owner
 *     tags: [Owners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       201:
 *         description: Owner created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/owners", validateOwner, addOwner);

/**
 * @swagger
 * /owners:
 *   get:
 *     summary: Retrieve a list of owners
 *     tags: [Owners]
 *     responses:
 *       200:
 *         description: A list of owners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Owner'
 */
router.get("/owners", getAllOwners);

/**
 * @swagger
 * /owners/{id}:
 *   get:
 *     summary: Get an owner by ID
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the owner
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Owner data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       404:
 *         description: Owner not found
 */
router.get("/owners/:id", getOwnerById);

/**
 * @swagger
 * /owners/{id}:
 *   put:
 *     summary: Update an existing owner
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the owner
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       200:
 *         description: Owner updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Owner not found
 */
router.put("/owners/:id", validateOwner, updateOwner);

/**
 * @swagger
 * /owners/{id}:
 *   delete:
 *     summary: Delete an owner
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the owner
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Owner deleted successfully
 *       404:
 *         description: Owner not found
 */
router.delete("/owners/:id", deleteOwner);

export default router;
