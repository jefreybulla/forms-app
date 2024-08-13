# FormsApp

## Requirements
- Install NX globally with `npm i -g nx`
- Install [nvm](https://github.com/nvm-sh/nvm)
- Install Node version specified in `.nvmrc` by running `nvm install`
- Install dependencies with `npm install`

## Start the application
Run API app
```
nx serve forms-api
```

Run React app
```
nx serve forms-app
```

## Running tasks

Run tests
```
nx test forms-api
nx test forms-app
```

Show project details with 
```
nx show project forms-app
nx show project forms-api
```

Show the graph of the workspace.
```
npx nx graph
```

## Build for production

Run `npx nx build forms-app` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Regarding the initial setup

This project was started using the following [Nx](https://nx.dev) commands
```
npx create-nx-workspace@latest forms-app --preset=react-monorepo
nx add @nx/express
nx g @nx/express:app forms-api --directory=apps/forms-api
```