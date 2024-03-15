import mongoose from "mongoose";

const db = mongoose
  .connect(
    "mongodb+srv://taharBelghitri:tahartlm@cluster0.acwd5jx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => "connected")
  .catch((err) => err);

db.then((e) => {
  if (typeof e === "string") return console.log("connected");
  return console.trace(e);
});
