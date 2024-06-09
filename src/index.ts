import { app } from "./application/app";
import "dotenv/config";
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Application running on http://localhost:${port}`);
});
