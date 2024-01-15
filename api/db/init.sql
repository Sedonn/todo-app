CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY,
    login VARCHAR(20) NOT NULL,
    password VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY,
    userId INTEGER NOT NULL,
    completed INTEGER DEFAULT 0,
    content TEXT DEFAULT '',
    createDate DATE,
    completeDate DATE DEFAULT NULL,
    FOREIGN KEY(userId) REFERENCES user(id)
);