import app from "./app";
import CONFIG from "./config/config";


// Set the network port
const port = CONFIG.PORT;

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at ${CONFIG.BASE_URL}`);
});
