# FormsApp

## Requirements
- Install NX globally with `npm i -g nx`
- Install [nvm](https://github.com/nvm-sh/nvm)
- Install Node version specified in `.nvmrc` by running `nvm install`

## Start the application

Run React app
```
nx serve forms-app
```
Run API app
```
nx serve forms-api
```

## Running tasks

Run tests
```
TBC
```
Run linter
```
TBC
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

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
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