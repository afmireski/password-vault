import { GraphQLScalarType } from 'graphql';

export const VoidScalar = new GraphQLScalarType({
  name: 'Void',
  description: 'Return nothing',
  serialize: (value) => {
    return;
  },
});
