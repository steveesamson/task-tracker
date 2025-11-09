# Setting Up Task Tracker Locally

In the project directory,
Create a `.env` file and update the following appropriately, to match values used in your `script/db.sql` with the values:

```shell
DB_NAME=tasksdb
DB_PORT=5432
DB_HOST=app.database
DB_USER=task_tracker

DB_PASS=<YOUR_PASSWORD_HERE> 
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
SERVER_HOST=app.server
PORT=5050
WEB_PORT=6060
WEB_HOST=app.web
SECRET=supersecretkey
VITE_API_URL=http://127.0.0.1:5050

```

Please update `YOUR_PASSWORD_HERE` in the backend/script/db.sql
Your file tree should look like:
├── README.md
├── backend
├── database
├── docker-compose.yml
└── frontend
└── .env

Run the following command from the displayed directory:

```shell

docker compose --env-file .env up

You should see something like, assuming you used the above ports:
app.server    | Task Tracker Backend runs at http://localhost:5050
app.web       | INFO  Accepting connections at http://localhost:6060

Click on the app.web link: http://localhost:6060 to open the application.

```


## App Demo

See a walk-through at: https://drive.google.com/file/d/1UCpfSsO53Tqf9gIQhzLgqkXO_Y5tGdxR/view?usp=sharing

## Testing

Visit https://task-tracker-frontend-gq01.onrender.com and login with the following:

UserID: _apptester_

Password: _p@55w0rd_

## Technology and Architecture

### Technology

**Frontend**: React.js/TypeScript/Routing

**Backend**: Node.js/express.js/JavaScript

**Store**: PostgreSQL

**JSON Web Token:** Security

**Deployment**: Render

### Architecture

**Client**: Static Site

**WebService(API):** REST API with express.js
The API supports the following endpoints:

- GET /tasks/:id?
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id
- GET /tasks/stats - Dashboard stats
- POST /auth/login
