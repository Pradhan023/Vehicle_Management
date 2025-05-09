import { Router } from "express";
import {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicle.controller";
import { validateVehicle } from "../middlewares/validation.middleware";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - make
 *         - model
 *         - year
 *         - owner_id
 *         - registration_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the vehicle
 *         make:
 *           type: string
 *           description: Make of the vehicle
 *         model:
 *           type: string
 *           description: Model of the vehicle
 *         year:
 *           type: integer
 *           description: Manufacturing year
 *         owner_id:
 *           type: integer
 *           description: ID of the owner
 *         registration_id:
 *           type: integer
 *           description: ID of the registration
 *       example:
 *         make: TATA
 *         model: Curve
 *         year: 2025
 *         owner_id: 2
 *         registration_id: 4
 */

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Retrieve a list of vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: A list of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 */
router.get("/vehicles", getAllVehicles);

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vehicle data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 */
router.get("/vehicles/:id", getVehicleById);

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Add a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/vehicles",validateVehicle , addVehicle);

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Update a vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Vehicle not found
 */
router.put("/vehicles/:id",validateVehicle , updateVehicle);

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *       404:
 *         description: Vehicle not found
 */
router.delete("/vehicles/:id", deleteVehicle);

export default router;

