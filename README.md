# cd /workspace/app

# npm i yarn

# yarn create next-app next-app --typescript
without "turbopack"

# cd /workspace/app/next-app

# yarn add prisma --save-dev
# yarn add @prisma/client
# yarn prisma init
config file of prisma generated.
# yarn prisma migrate dev --name init
Prisma Client is only generated.
changes of DB schemes are applied.
## yarn prisma generate
Prisma Client is generated.

# psql -U postgres -d tododb
select * from "Todo";
select * from "Group";

INSERT INTO "Group" (name, "createdAt") VALUES ('All', NOW());

# yarn dev
next dev