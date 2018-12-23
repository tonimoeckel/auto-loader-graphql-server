const resolver = (_, { name }) => {
    const returnValue = `Hello ${name || "World!"}`;
    return returnValue;
};

export default resolver;
