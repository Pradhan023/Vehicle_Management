import { Request, Response } from "express";
import { db } from "../utils/db";

//  add vehicle
export const addVehicle = async (req: Request, res: Response) => {
  const { make, model, year, owner_id, registration_id } = req.body;
  try {
    const [existing] = await db.execute(
      "SELECT id FROM vehicles WHERE registration_id = ?",
      [registration_id]
    );

    if ((existing as any).length > 0) {
      res.status(403).json({ 
        error: "Vehicle with this registration already exists",
        existing: (existing as any)[0]
      });
      return
    }

    const [result] = await db.execute(
      "INSERT INTO vehicles (make, model, year, owner_id, registration_id) VALUES (?, ?, ?, ?, ?)",
      [make, model, year, owner_id, registration_id]
    );
    res.status(201).json({ vehicleId: (result as any).insertId });
  } catch (err:any) {
    console.error("Database error in addVehicle:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};

//  update vehicle
export const updateVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { make, model, year, owner_id, registration_id } = req.body;
  try {
    await db.execute(
      "UPDATE vehicles SET make=?, model=?, year=?, owner_id=?, registration_id=? WHERE id=?",
      [make, model, year, owner_id, registration_id, id]
    );
    res.json({ message: "Updated" });
  } catch(err:any) {
    console.error("Database error in updateVehicle:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};

//  delete vehicle
export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    await db.execute("DELETE FROM vehicles WHERE id=?", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch(err:any) {
    console.error("Database error in deleteVehicle:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};

//  get all vehicles
export const getAllVehicles = async (_: Request, res: Response) => {
  try {
    const [rows] = await db.execute(
      `SELECT v.id, v.make, v.model, v.year,
              o.name AS ownerName,
              r.plate_number, r.state
       FROM vehicles v
       JOIN owners o ON v.owner_id = o.id
       JOIN registrations r ON v.registration_id = r.id`
    );
    res.json(rows);
  } catch(err:any) {
    console.error("Database error in getallvehicles:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};


//  get vehicle by id
export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute(
      `SELECT v.id, v.make, v.model, v.year,
              o.name AS ownerName,
              r.plate_number, r.state
       FROM vehicles v
       JOIN owners o ON v.owner_id = o.id
       JOIN registrations r ON v.registration_id = r.id
       WHERE v.id = ?`,
      [req.params.id]
    );
    const data = rows as any;
    if (!data.length) res.status(404).json({ error: "Not found" });
    res.json(data[0]);
  } catch(err:any) {
    console.error("Database error in getvehiclebyid:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};
