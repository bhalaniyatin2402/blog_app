import { connect } from "mongoose";

async function connetToDB() {
  try {
    const { connection } = await connect(process.env.DB_URL);

    if (connection) {
      console.log("connect to MongoDB: ", connection.host);
    }
  } catch (error) {
    console.log("connection Error: ", error);
    process.exit(1);
  }
}

export default connetToDB;
