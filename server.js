import app from "./app.js";
import connetToDB from "./config/dbConfig.js";
import './config/cloudinaryConfig.js'

const PORT = process.env.PORT || 80;

app.listen(PORT, async () => {
  await connetToDB();
  console.log(`server is running on port ${PORT}`);
});
