const { createService } = require("./src/server");
const app = createService();

app.listen(3000, () => {
  console.log("Server running");
});
