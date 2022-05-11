# PostMint

## Getting Started

There are 2 packages in this repo: a [`backend`](./packages/backend) which is a REST API written in Express, and a [`frontend`](./packages/frontend) which is a React single-page application.

#### Start the demo using Yarn:

From the root folder of this repo, run

```bash
sh setup.sh
yarn start
```

The backend should be running on `localhost:8000`, and the frontend on `localhost:3000`.

Alternatively, you can start the frontend and the backend separately:

```bash
# Start the backend
cd packages/backend
yarn start

# Start the frontend
cd packages/frontend
yarn start
```
