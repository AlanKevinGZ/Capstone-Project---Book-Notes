import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "LibraryManager",
    password: "admin",
    port: 5432,
});

export {db} 