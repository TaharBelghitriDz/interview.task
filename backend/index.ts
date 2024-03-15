import express from "express";
import cors from "cors";
import { data, dataSelect } from "./data";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({}));

app.get("/", (req, res) => {
  if (req.query.term && typeof req.query.term == "string")
    return res.status(200).json({ data: dataSelect(req.query.term) });

  res.status(200).json({ data });
});

export default app;

// app.listen(3000, () => console.log("app is running on port 3000"));
