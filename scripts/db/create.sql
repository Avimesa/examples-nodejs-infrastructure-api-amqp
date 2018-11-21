-- Create the user and password using Avimesa Group Login (user has a leading underscore)
CREATE USER :v1 WITH PASSWORD :v2;

-- Create a database with the same name as the user
CREATE DATABASE :v1;

-- Connect
\c :v1;

-- Enable the timescaledb extension on this database
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- Create raw table
CREATE TABLE dcacct (
 time TIMESTAMP NOT NULL,
 data jsonb
);

GRANT ALL PRIVILEGES ON TABLE raw TO :v1;
SELECT create_hypertable('dcacct', 'time');

-- add primary key after previous call to prevent error
ALTER TABLE dcacct ADD COLUMN id serial PRIMARY KEY;
GRANT USAGE, SELECT ON SEQUENCE dcacct_id_seq TO :v1;

-- Create syslog table
CREATE TABLE syslog (
 id serial PRIMARY KEY,
 data text
);

GRANT ALL PRIVILEGES ON TABLE syslog TO :v1;
GRANT USAGE, SELECT ON SEQUENCE syslog_id_seq TO :v1;
