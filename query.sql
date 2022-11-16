CREATE DATABASE hiring_db;

CREATE TABLE
    users (
        id varchar primary key not null,
        name varchar not null,
        email varchar not null,
        password varchar not null,
        phone varchar not null,
        address varchar not null,
        photo varchar,
        role varchar not null,
        description varchar,
        user_token varchar,
        instagram varchar,
        github varchar,
        linkedin varchar,
        is_verified boolean,
        created_date date
    );

CREATE TABLE
    workers(
        id varchar primary key not null,
        job_desc varchar,
        job_type varchar,
        skills varchar [],
        company_name varchar,
        users_id varchar not null
    );

CREATE TABLE
    recruiters(
        id varchar primary key not null,
        company_name varchar,
        position varchar,
        users_id varchar not null
    );

CREATE TABLE
    experiences(
        id varchar primary key not null,
        position varchar,
        photo varchar,
        company varchar,
        start_date date,
        end_date date,
        description varchar,
        user_id varchar not null,
        created_date date not null
    );

CREATE TABLE
    projects(
        id varchar primary key not null,
        title varchar not null,
        photo varchar,
        app_type varchar not null,
        repo varchar,
        user_id varchar not null,
        created_at date not null
    );