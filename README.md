## move dir
cd /workspace/app

## install yarn package
npm i yarn

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

## psql -U postgres -d tododb
```
select * from "Todo";
select * from "Group";

INSERT INTO "Group" (name, "createdAt") VALUES ('All', NOW());

```

## build develop env
```
yarn dev

(next dev)
```