import app from './src/app.js';
import { connectionDB } from './src/db.js';

connectionDB();
app.listen(3000)
console.log('Server running on http://localhost:3000')