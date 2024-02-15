import database from "./config/db";
import server from "./server";
require("dotenv").config();

// MongoDB connection with retry
database();

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
