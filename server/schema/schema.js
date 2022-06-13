const {projects, clients} = require("../dummyData")

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require("graphql");
// Clients schema
const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
     id: {type: GraphQLID},
     name: {type: GraphQLString},
     email:{type:GraphQLString},
     phone:{type:GraphQLString}
    })
});

// Projects schema
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type:ClientType,
            resolve(parent,args){
                return clients.find(client => client.id === parent.clientId);
            } }
    })
});

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields: {
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent,args){
                return projects
            }
        },
        // Single project
        project:{
            type: ProjectType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){
                return projects.find(project => project.id === args.id)
            }
        },
        //All clients
        clients:{
            type:GraphQLList(ClientType),
            resolve(parent,args){
                return clients
            }
        },
        //Single client
        client:{
            type: ClientType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){
                    return clients.find(client => client.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})