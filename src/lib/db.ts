// db.ts (or db.js)
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost', 
  port: 5432, 
  user: 'myuser',
  password: 'admin123', 
  database: 'bankingapp', 
});


export default pool;
