import db from "./db";

type WallRow = {
    id: number,
    name: string,
    description: string | null,
    created_at: string
};

type Wall = {
    id: number,
    name: string,
    description: string | null,
    createdAt: Date
}

function rowToWall(row: WallRow): Wall {
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        createdAt: new Date(row.created_at)
    }
}

export function getWalls(): Wall[] {
    return db.getAllSync<WallRow>(
        'SELECT * FROM walls ORDER BY created_at DESC',
    ).map(rowToWall);
}

export function addWall(name: string, description: string | null): void {
    db.runSync(
        'INSERT INTO walls (name, description) VALUES (?, ?)',
        [name, description]
    );
}

export function updateWall(id: number, name: string, description: string | null): void {
    db.runSync(
        'UPDATE walls SET name = ?, description = ? WHERE id = ?', 
        [name, description, id]
    );
}

export function deleteWall(id: number): void {
  db.runSync('DELETE FROM walls WHERE id = ?', [id]);
}