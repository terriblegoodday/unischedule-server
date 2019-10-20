import { Teacher, Group, Class } from './database'
import _ from 'lodash'

console.log(`📍 Import success`)

export const resolvers = {
  Query: {
    getAllTeachers: () => Teacher.findAll(),
    getAllGroups: () => Group.findAll(),
    getAllClasses: () => Class.findAll()
    // getAllTeachers: () => [{
    //     id: 1,
    //     fullName: "Елена Ивановна Антонова",
    //     firstName: "Елена",
    //     middleName: "Ивановна",
    //     lastName: "Антонова",
    //     department: "Что-то",
    //     clases: []
    //   }]
  },
  Group: {
    classes: (root) => {
      return Class.findAll({
        where: {
          groupFk: root.id
        }
      }).map(
        ({id, time, place, description, week, teacherFk, groupFk, number}) => {
          return {
            id,
            time,
            place,
            description,
            week,
            teacherId: teacherFk,
            groupId: groupFk,
            number
          }
        }
      )
    }
  },
  Teacher: {
    fullName: ({firstName, middleName, lastName}) => [firstName, middleName, lastName].join(" "),
    classes: (root) => {
      return Class.findAll({
        where: {
          teacherFk: root.id
        }
      }).map(
        ({id, time, place, description, week, teacherFk, groupFk, number}) => {
          return {
            id,
            time,
            place,
            description,
            week,
            teacherId: teacherFk,
            groupId: groupFk,
            number
          }
        }
      )
    }
  },
  Class: {
    group: (root) => {
      return Group.findByPk(root.groupId)
    },
    teacher: (root) => {
      return Teacher.findByPk(root.teacherId)
    }
  },
  Mutation: {
    createTeacher: (root, { firstName, middleName, lastName, department }, context, info) => {
      console.log(`📍 Creating teacher ${firstName} ${middleName} ${lastName}`)
      return Teacher.create({
        firstName,
        middleName,
        lastName,
        department
      })
    },
    createGroup: (root, { code, description }, context, info) => {
      return Group.create({
        code,
        description
      })
    },
    createClass: async (root, { teacher, group, place, description, week, number }, context, info) => {
      return Class.create({
        place,
        description,
        week,
        number,
        groupFk: group,
        teacherFk: teacher
      })
    }
  }
}