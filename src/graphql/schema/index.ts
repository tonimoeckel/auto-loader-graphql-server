const schema = `
  type Query {
    hello(name: String): String
  }
  
  type Mutation {
    hello(name: String): String
  }
`;

export default schema;
