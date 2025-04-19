# Introduction
This is todo app.<br>
Typescript + Next.js development env by Docker devcontainer.

# Directory
```
ts-react-nextjs/
├── .devcontainer/
│   ├── .env
│   ├── devcontainer.json
│   ├── docker-compose.yml
│   └── Dockerfile
│
├── .vscode/
│   └── launch.json
│ 
├── app/
│   └── next-app/　# app dir
│              
├── .gitignore
└── README.md

```

# Initial Setting

## move dir
cd /workspace/app

## install yarn package
corepack prepare yarn@1.22.22 --activate

## create nextjs project without "turbopack"
```
yarn create next-app next-app --typescript
```

## config file of prisma generated.
```
yarn add prisma --save-dev
yarn add @prisma/client
yarn prisma init
```

## Prisma Client is only generated. 
## changes of DB schemes are applied.
```
yarn prisma migrate dev --name init
yarn prisma migrate deploy
```

## Prisma Client is generated.
```
yarn prisma generate
```

## exec seed.ts (initial date)
```
yarn add -D ts-node
yarn prisma db seed
```

## For checking DB 
psql -U postgres -d tododb
```
select * from "Todo";
select * from "Group";

```

## build develop env
```
yarn dev

(next dev)
```