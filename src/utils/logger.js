const morgan = require("morgan");

// Logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
