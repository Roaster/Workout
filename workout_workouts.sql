DROP TABLE IF EXISTS workout;

CREATE TABLE workout (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout INTEGER NOT NULL,
    setNum INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    date DATE NOT NULL,
    max INTEGER NOT NULL,
    datestring TEXT NOT NULL
)

CREATE TABLE workouts (
    id INTEGET PRIMARY KEY AUTOINCREMENT,
    workout TEXT NOT NULL
)