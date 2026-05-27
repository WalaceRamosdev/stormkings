# Storm Kings

## Instalação

```bash
npx create-next-app@latest storm-kings --typescript --tailwind --eslint

cd storm-kings

npm install framer-motion lucide-react clsx tailwind-merge
npm install @prisma/client nestjs @nestjs/core @nestjs/platform-express
npm install -D prisma
```

## Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

## Rodar projeto

```bash
npm run dev
```
