import app from "./app";
import connetToDB from "./config/dbConfig";
import './config/cloudinaryConfig'

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await connetToDB();
  console.log(`server is running on port ${port}`);
});
