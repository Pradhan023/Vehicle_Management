import { Router } from "express";
import {
  addRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
} from "../controllers/registration.controller";
import { validateRegistration } from "../middlewares/validation.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Registrations
 *   description: API endpoints for managing vehicle registrations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Registration:
 *       type: object
 *       required:
 *         - plate_number
 *         - state
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the registration
 *         plate_number:
 *           type: string
 *           description: Vehicle plate number
 *         state:
 *           type: string
 *           description: State of registration
 *       example:
 *         id: 1
 *         plate_number: JMU132666
 *         state: Jammu
 */

/**
 * @swagger
 * /registrations:
 *   post:
 *     summary: Create a new registration
 *     tags: [Registrations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       201:
 *         description: Registration created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/registrations", validateRegistration, addRegistration);

/**
 * @swagger
 * /registrations:
 *   get:
 *     summary: Retrieve a list of registrations
 *     tags: [Registrations]
 *     responses:
 *       200:
 *         description: A list of registrations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Registration'
 */
router.get("/registrations", getAllRegistrations);

/**
 * @swagger
 * /registrations/{id}:
 *   get:
 *     summary: Get a registration by ID
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the registration
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registration data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       404:
 *         description: Registration not found
 */
router.get("/registrations/:id", getRegistrationById);

/**
 * @swagger
 * /registrations/{id}:
 *   put:
 *     summary: Update an existing registration
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the registration
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       200:
 *         description: Registration updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Registration not found
 */
router.put("/registrations/:id", validateRegistration, updateRegistration);

/**
 * @swagger
 * /registrations/{id}:
 *   delete:
 *     summary: Delete a registration
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the registration
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registration deleted successfully
 *       404:
 *         description: Registration not found
 */
router.delete("/registrations/:id", deleteRegistration);

export default router;
