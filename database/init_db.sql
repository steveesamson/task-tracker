-- DROP DATABASE tasksdb;
-- DROP ROLE task_tracker ;

-- DROP USER task_tracker;

CREATE USER task_tracker WITH PASSWORD 't@5kTr@ck3r';
CREATE DATABASE tasksdb OWNER = task_tracker;



GRANT CONNECT ON DATABASE tasksdb TO task_tracker ;
GRANT ALL PRIVILEGES ON DATABASE tasksdb TO task_tracker;

\c tasksdb


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(150) NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) UNIQUE NOT NULL, 
  description TEXT, 
  status VARCHAR(15) DEFAULT 'todo',  
  priority VARCHAR(6) DEFAULT 'low', 
  created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
  completed_at TIMESTAMP WITH TIME ZONE
);
		
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO task_tracker;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO task_tracker;

-- Test account
INSERT INTO users (user_id, password) VALUES ('apptester','4e1b2a974bc7197f6859c1c2946ecefbcdb514bb3bce4a1f0b746485f9a63d3f07eeef3b294a947b1e5c56da447860a7aa23322e9577c14093784a1842fc23d2.776e24e447396ed9');