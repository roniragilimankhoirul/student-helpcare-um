"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./application/app");
require("dotenv/config");
const port = process.env.PORT || 8080;
app_1.app.listen(port, () => {
    console.log(`Application running on http://localhost:${port}`);
});
