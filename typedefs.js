import gql from 'apollo-server'

export const typeDefs = gql`
  type Teacher {
    id: ID!
    fullname: String!   # needs resolver
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
    clases: [Class]!    # needs resolver, can return empty array
    currentClass: Class # needs resolver, can return null
  }

  type Class {
    id: ID!
    time: String!       # no need for anything, we're not
                        # writing sophisticated backend here
    place: String!
    description: String!
    week: WeekType!
    teacherId: ID!
    teacher: Teacher!   # needs resolver
    groupId: ID!
    group: Group!       # needs resolver
  }

  enum WeekType {       # naive solution, but it works!
    EVEN
    ODD
  }
`
