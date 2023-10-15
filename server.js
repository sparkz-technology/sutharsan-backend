import app from "./app.js";
import constant from "./config/constant.js";
import connectDB from "./config/db.js";

const { PORT } = constant;

await connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
