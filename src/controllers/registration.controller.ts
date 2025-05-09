import { Request, Response } from "express";
import { db } from "../utils/db";

// Create registration
export const addRegistration = async (req: Request, res: Response) => {
  const { plate_number, state } = req.body;
  try {
    const [existing] = await db.execute(
      "SELECT id FROM registrations WHERE plate_number = ?",
      [plate_number]
    );

    if ((existing as any).length > 0) {
      res.status(403).json({ 
        error: "Plate number is already registered",
        existing: (existing as any)[0]
      });
      return;
    }

    const [result] = await db.execute(
      "INSERT INTO registrations (plate_number, state) VALUES (?, ?)",
      [plate_number, state]
    );
    res.status(201).json({ registrationId: (result as any).insertId });
  } catch (err: any) {
    console.error("Database error in addRegistration:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};

// Get all registrations
export const getAllRegistrations = async (_: Request, res: Response) => {
  try {
    const [rows] = await db.execute("SELECT * FROM registrations");
    res.json(rows);
  } catch (err: any) {
    console.error("Database error in getAllRegistrations:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};

// Get single registration
export const getRegistrationById = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM registrations WHERE id = ?",
      [req.params.id]
    );
    const data = rows as any;
    if (!data.length) res.status(404).json({ error: "Not found" });
    res.json(data[0]);
  } catch (err: any) {
    console.error("Database error in getRegistrationById:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};

// Update registration
export const updateRegistration = async (req: Request, res: Response) => {
  const { plate_number, state } = req.body;
  try {
    await db.execute(
      "UPDATE registrations SET plate_number = ?, state = ? WHERE id = ?",
      [plate_number, state, req.params.id]
    );
    res.json({ message: "Updated" });
  } catch (err: any) {
    console.error("Database error in updateRegistration:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};

// Delete registration
export const deleteRegistration = async (req: Request, res: Response) => {
  try {
    await db.execute("DELETE FROM registrations WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ message: "Deleted" });
  } catch (err: any) {
    console.error("Database error in deleteRegistration:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};
