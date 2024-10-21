import app from "./src/app.js";
import { PORT } from "./src/config.js";
import { connectDB } from "./src/db.js";

async function main() {
    try {
        await connectDB();
        app.listen(PORT);
        console.log(`Listening on port http://localhost:${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`)
    } catch (error) {
        console.error(error);
    }
}

main();
