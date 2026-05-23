import db from "./db";

type BrickRow = {
    id: number,
    wall_id: number,
    date_completed: string,
    created_at: string
};

type Brick = {
    id: number,
    wallId: number,
    dateCompleted: Date,
    createdAt: Date
}

function rowToBrick(row: BrickRow): Brick {
    return {
        id: row.id,
        wallId: row.wall_id,
        dateCompleted: new Date(row.date_completed),
        createdAt: new Date(row.created_at)
    }
}

export function getBricksForWall(wallId: number): Brick[] {
    return db.getAllSync<BrickRow>(
        'SELECT * FROM bricks WHERE wall_id = ? ORDER BY date_completed DESC',
        [wallId]
    ).map(rowToBrick);
}

export function addBrick(wallId: number, dateCompleted: Date | null): void {
    db.runSync(
        'INSERT INTO bricks (wall_id, date_completed) VALUES (?, ?)',
        [wallId, dateCompleted ? dateCompleted.toISOString() : null]
    );
}

export function updateBrick(id: number, dateCompleted: Date | null): void {
    db.runSync(
        'UPDATE bricks SET date_completed = ? WHERE id = ?', 
        [dateCompleted ? dateCompleted.toISOString() : null, id]
    );
}

export function deleteBrick(id: number): void {
  db.runSync('DELETE FROM bricks WHERE id = ?', [id]);
}