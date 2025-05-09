import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import vehicleRoutes from "./routes/vehicle.routes";
import registrationRoutes from "./routes/registration.routes";
import ownerRoutes from "./routes/owner.routes";

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());

// swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vehicle API",
      version: "1.0.0",
      description: "API documentation for Vehicle Management System",
    },
    servers: [
      {
        url: process.env.PROD_URL || `http://localhost:${process.env.PORT || 3000}/api/v1`,
      },
    ],
  },
  apis: [ `${process.env.NODE_ENV === "production" ? "./dist/routes/*.js" : "./src/routes/*.ts"}`],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// routes
app.get("/", (_req, res) => {
  res.send("Running Server");
});
app.use("/api/v1", vehicleRoutes);
app.use("/api/v1", registrationRoutes);
app.use("/api/v1", ownerRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
