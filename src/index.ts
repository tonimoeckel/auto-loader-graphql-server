import { GraphQLServer } from "graphql-yoga";
import getResolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schema";

const init = () => {

  console.log("Starting ...");

  return getResolvers.then((resolvers) => {

    // @ts-ignore
    const server = new GraphQLServer({
      resolvers,
      typeDefs,
    });

    return server.start(() => console.log("Server is running on http://localhost:4000"))
        .catch((error) => console.error(error));
  });

};

export default init;
