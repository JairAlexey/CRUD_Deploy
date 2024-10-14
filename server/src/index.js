import app from './app.js';
import { connectionDB } from './db.js';

connectionDB();
app.listen(3000)
console.log('Server running on http://localhost:3000')