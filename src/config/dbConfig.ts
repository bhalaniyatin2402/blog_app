import { connect } from "mongoose";


async function connetToDB() {
  try {
    const db_url = process.env.DB_URL !== undefined ? process.env.DB_URL : ''

    const { connection } = await connect(db_url);

    if (connection) {
      console.log("connect to MongoDB: ", connection.host);
    }
  } catch (error) {
    console.log("connection Error: ", error);
    process.exit(1);
  }
}

export default connetToDB;
