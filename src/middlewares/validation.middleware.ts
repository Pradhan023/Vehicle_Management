import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

// vehicle
export const validateVehicle: RequestHandler = (req:Request, res:Response, next:NextFunction) => {
  const schema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().integer().min(1886).required(),
    owner_id: Joi.number().integer().required(),
    registration_id: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    // Send error response, but do not return the res obj
    res.status(400).json({ error: error.details[0].message });
    return;  
  }

  next();   
};


// owner
export const validateOwner: RequestHandler = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required()
      .messages({
        "string.empty": "Owner name is required",
        "string.min":   "Owner name cannot be empty",
        "any.required": "Owner name must be provided"
      })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};

// registration
export const validateRegistration: RequestHandler = (req:Request, res:Response, next:NextFunction) => {
  const schema = Joi.object({
    plate_number: Joi.string().alphanum().min(1).max(20).required()
      .messages({
        "string.empty": "Plate number is required",
        "string.alphanum": "Plate must be alphanumeric",
        "any.required": "Plate number must be provided"
      }),
    state: Joi.string().min(2).max(50).required()
      .messages({
        "string.empty": "State is required",
        "any.required": "State must be provided"
      }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};

