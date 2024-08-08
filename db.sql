CREATE TABLE schools
(
    id         VARCHAR(100) NOT NULL DEFAULT gen_random_uuid(),
    name       VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
);

CREATE TABLE admins
(
    id         VARCHAR(100) NOT NULL,
    id_school  VARCHAR(100) NOT NULL,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    constraint admins_email_unique unique (email),
    constraint admins_id_school_unique unique (id_school),
    constraint fk_admins_schools foreign key (id_school) references schools (id)

);

CREATE TABLE users
(
    id         VARCHAR(100) NOT NULL,
    id_school  VARCHAR(100) NOT NULL,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL,
    photo_url VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    constraint users_email_unique unique (email),
    constraint fk_users_schools foreign key (id_school) references schools (id)
);


CREATE TABLE complaints
(
    id           VARCHAR(100) NOT NULL default gen_random_uuid(),
    id_user      VARCHAR(100) NOT NULL,
    description  TEXT         NOT NULL,
    is_responded BOOLEAN      NOT NULL DEFAULT FALSE,
    comment      TEXT,
    created_at   TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    constraint fk_complaints_users foreign key (id_user) references users(id)
);

truncate admins
truncate complaints, users
ALTER TABLE users
    DROP CONSTRAINT users_id_school_unique;
