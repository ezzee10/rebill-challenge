CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(30) NOT NULL,
    name VARCHAR(20) NOT NULL,
    surname VARCHAR(30) NOT NULL,
    documentType VARCHAR(4) NOT NULL,
    documentNumber VARCHAR(10) NOT NULL,
    createdate timestamp NOT NULL DEFAULT now(),
    updateddate timestamp NOT NULL DEFAULT now()
    UNIQUE(email)
);

CREATE UNIQUE INDEX users_email_id ON users (email);