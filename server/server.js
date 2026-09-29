import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

await connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
