const mongodbUri =
  "mongodb+srv://anas-admin:Dpfiwq8yP1Lj9Fju@cluster0.fsgcr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(mongodbUri, {
      dbName: "my-todo-db",
    });

    console.log(`\n🌿 MongoDB connected ! 🍃\n`);

    mongoose.connection.on(
      "error",
      console.error.bind(console, "Connection error:")
    );

    process.on("SIGINT", () => {
      // Cleanup code
      mongoose.connection.close();

      console.log("Mongoose connection closed due to application termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("MONGODB connection FAILED ", error);
    process.exit(1); // Exited with error
  }
};

try {
  connectDB();
} catch (error) {
  console.log(error);
}
