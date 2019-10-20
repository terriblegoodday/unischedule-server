import { gql } from 'apollo-server'

const typeDefs = gql`
  type Teacher {
    id: ID!
    fullName: String!   # needs resolver
    firstName: String!
    middleName: String!
    lastName: String!
    department: String!
    classes: [Class]!   # needs resolver, can return empty array
    currentClass: Class # needs resolver, can return null
  }

  type Group {
    id: ID!
    code: String!
    description: String!
    classes: [Class]!    # needs resolver, can return empty array
    currentClass: Class # needs resolver, can return null
  }

  type Class {
    id: ID!
    time: String!       # RESOLVER no need for anything, we're not
                        # writing sophisticated backend here
    place: String!
    description: String!
    week: WeekType!
    teacherId: ID!
    teacher: Teacher!   # needs resolver
    groupId: ID!
    group: Group!       # needs resolver
    number: Int!
    weekday: Int!
  }

  enum WeekType {       # naive solution, but it works!
    EVEN
    ODD
  }

  type Query {
    getAllTeachers: [Teacher]!
    getAllGroups: [Group]!
    getAllClasses: [Class]!
  }

  type Mutation {
    createTeacher(
      firstName: String!,
      middleName: String!,
      lastName: String!,
      department: String!
    ): Teacher
    createGroup(
      code: String!,
      description: String!,
    ): Group
    createClass(
      teacher: ID!,
      group: ID!,
      place: String!,
      description: String!,
      week: WeekType!,
      number: Int!,
      weekday: Int!
    ): Class
  }
`

export { typeDefs }