import { Prisma } from '@prisma/client';

const GlobalPrismaExtension = Prisma.defineExtension({
  query: {
    $allModels: {
      $allOperations({ args, operation, query }) {
        // Operações create não possuem parâmetro where
        if (operation !== 'create') {
          args = args as Extract<typeof args, { where: unknown }>;

          args.where = {
            deleted_at: null,
            ...args.where,
          };
        }

        return query(args);
      },
    },
  },
});

const HidePasswordPrismaExtension = Prisma.defineExtension({
  result: {
    user: {
      password: {
        needs: {},
        compute() {
          return undefined;
        },
      },
    },
    password: {
      value: {
        needs: {},
        compute() {
          return undefined;
        },
      },
    },
  },
});

export default GlobalPrismaExtension;
