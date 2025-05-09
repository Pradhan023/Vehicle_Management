import { Request, Response } from "express";
import { db } from "../utils/db";

// Create owner
export const addOwner = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const [existing] = await db.execute(
      "SELECT id FROM owners WHERE name = ?",
      [name]
    );

    if ((existing as any).length > 0) {
      res.status(403).json({ 
        error: "Owner already exists",
        existing: (existing as any)[0]
      });
      return;
    }

    const [result] = await db.execute(
      "INSERT INTO owners (name) VALUES (?)",
      [name]
    );
    res.status(201).json({ ownerId: (result as any).insertId });
  } catch (err: any) {
    console.error("Database error in addOwner:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};

// Get all owners
export const getAllOwners = async (_: Request, res: Response) => {
  try {
    const [rows] = await db.execute("SELECT * FROM owners");
    res.json(rows);
  } catch (err: any) {
    console.error("Database error in getAllOwners:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};

// Get single owner
export const getOwnerById = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute("SELECT * FROM owners WHERE id = ?", [
      req.params.id,
    ]);
    const data = rows as any;
    if (!data.length) {
      res.status(404).json({ error: "Not found" });
    }
    res.json(data[0]);
  } catch (err: any) {
    console.error("Database error in getOwnerById:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};

// Update owner
export const updateOwner = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    await db.execute("UPDATE owners SET name = ? WHERE id = ?", [
      name,
      req.params.id,
    ]);
    res.json({ message: "Updated" });
  } catch (err: any) {
    console.error("Database error in updateOwner:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};

// Delete owner
export const deleteOwner = async (req: Request, res: Response) => {
  try {
    await db.execute("DELETE FROM owners WHERE id = ?", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (err: any) {
    console.error("Database error in deleteOwner:", err);
    res.status(500).json({ error: "DB error", details: err.message });
  }
};
