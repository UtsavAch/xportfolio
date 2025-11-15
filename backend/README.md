## Backend Structure

```bash
backend/
├── .github/
│ └── workflows/
│   └── ci.yml
├── src/
│ ├── controllers/              # Handle HTTP requests and responses
│ │ └── usersController.js
│ ├── database/                 # Database setup and initialization logic
│ │ ├── db/
│ │ │ ├── db.js
│ │ │ └── logger.js
│ │ ├── models/                 # Sequelize models representing database tables
│ │ │ └── models.js
│ │ └── repositories/           # Abstraction layer to access data sources (DB)
│ │   └── usersRepository.js
│ ├── routes/                   # Define API endpoints and route logic
│ │ └── usersRoute.js
│ └── services/                 # Business logic (e.g., CRUD operations, workflows)
│   └── usersService.js
├── .env
├── docker-compose.yml
├── Dockerfile
├── server.js                   # Main entry point that starts the server
└── render.yaml
```

## API Endpoints

User Endpoints

```bash
GET     .../api/users       #Get all users
GET     .../api/users/:id   #Get the user of specific id
POST    .../api/users       #Create an user (body: name, email, password)
PUT     .../api/users/:id   #Update the user of specific id (body: name, email, password)
DELETE  .../api/users/:id   #Delete the user of specific id
```
