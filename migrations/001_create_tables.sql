CREATE TABLE member (
    id                  SERIAL PRIMARY KEY,
    name                VARCHAR(255) NOT NULL,
    email               VARCHAR(255) NOT NULL UNIQUE,
    image_url           VARCHAR(255),
    bio                 TEXT,
    salt                VARCHAR(32) NOT NULL,
    hashed_password     VARCHAR(128) NOT NULL,
    coins               INT NOT NULL DEFAULT 100,
    diamonds            INT NOT NULL DEFAULT 0,
    role                VARCHAR NOT NULL DEFAULT 'MEMBER'  
);

CREATE TABLE item (
    id                  SERIAL PRIMARY KEY,
    title               VARCHAR(128) NOT NULL UNIQUE,
    description         TEXT,
    price_coins         int NOT NULL,
    price_diamonds      int NOT NULL
);

CREATE TABLE owned_item (
    id                  SERIAL PRIMARY KEY,
    member_id           INT REFERENCES member(id),
    item_id             INT REFERENCES item(id)
);

DROP TABLE member;
DROP TABLE item;
DROP TABLE owned_item;

SELECT * FROM member;