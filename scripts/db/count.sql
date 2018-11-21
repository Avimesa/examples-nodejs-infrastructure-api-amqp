-- Connect
\c :v1;

-- raw
SELECT count(*) FROM (SELECT 1 FROM dcacct LIMIT 500000) t;

-- syslog
SELECT count(*) FROM (SELECT 1 FROM syslog LIMIT 500000) t;