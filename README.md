# Setting up Task Tracker

In the project directory,

## Backend

You need a PostgreSQL:
Inside the /backend directory, do the following:
Update and Run the `script/db.sql` on your DB.

Create a `.env` file and update the following appropriately, to match values used in your `script/db.sql` with the values:

```shell
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
PORT=
SECRET=

```

- `npm install`
- `npm start`

The above should start the server on port `PORT`.

## Frontend

Inside the /frontend directory, do the following:

Create a `.env` file and update the following appropriately:

```shell
VITE_API_URL=http://127.0.0.1:{PORT}

PORT is from the backend setup
``

- `npm install`
- `npm install -g serve`
- `npm run build`

- `serve -s dist -l`

A URL will be displayed click and open the URL to view that application

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
