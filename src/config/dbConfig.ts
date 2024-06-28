import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);

    mongoose.connection.on("connected", () => {
      console.log("Mongodb connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB Error0 " + err);
      process.exit();
    });
  } catch (error: any) {
    console.log(error);
  }
}
