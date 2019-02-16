const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// PS3 Data
const Ps3 = new GraphQLObjectType({
  name: "Ps3",
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    collection: {
      type: new GraphQLList(Ps3),
      resolve(parent, args) {
        return axios.get("http://localhost:3000/data").then(res => res.data);
      }
    },
    single: {
      type: Ps3,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve(parent, args) {
        return axios
          .get(`http://localhost:3000/data/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});