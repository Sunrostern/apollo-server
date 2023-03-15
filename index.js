const {
  ApolloServer,
  gql
} = require('apollo-server');

const typeDefs = gql`
  """
  GraphQL Type Definitions.
  """
  scalar Date

  type SkiDay {
    id: ID!
    date: Date!
    mountain: String!
    conditions: Conditions
  }

  enum Conditions {
    POWDER
    HEAVY
    ICE
    THIN
  }

  type Query {
    totalDays: Int!
    allDays: [SkiDay!]!
  }

  type RemoveDayPayload {
    day: SkiDay!
    removed: Boolean
    totalBefore: Int
    totalAfter: Int
  }

  "To be implemented."
  type Subscription {
    newDay: SkiDay!
  }

  input AddDayInput {
    date: Date!
    mountain: String!
    conditions: String
  }
  
  type Mutation {
    addDay(input: AddDayInput): SkiDay!
    removeDay(id: ID): RemoveDayPayload!
  }
`;

// const resolvers = {};

const mocks = {
  Date: () => '2023-01-01',
  String: () => 'Hello, world!'
};

const server = new ApolloServer({
  typeDefs,
  mocks // mocks: true
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}.`);
});