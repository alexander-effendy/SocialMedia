import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url"; // allow to property set the path when we configure directory

// CONFIGURATIONS (middleware configs and different packages configs)
const __filename = fileURLToPath(import.meta.url) // grab fileurl 
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app,use(express.json());
app,use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app,use(bodyParser.urlencoded({ limit: "30mb", etended: true }));
app.use(cors());
app.use("/assets", express.static(path,join(__dirname, 'public/assets')));

/* File STORAGE */
// everytime someone upload a file onto website, saved into this folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage });