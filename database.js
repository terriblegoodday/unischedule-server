import Sequelize from 'sequelize'

const db = new Sequelize('schedule', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite'
})

const TeacherModel = db.define('teacher', {
  firstName: { type: Sequelize.STRING },
  middleName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  department: { type: Sequelize.STRING },
})

const GroupModel = db.define('group', {
  code: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
})

const ClassModel = db.define('class', {
  place: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  week: { type: Sequelize.BOOLEAN },
  number: { type: Sequelize.INTEGER },
  weekDay: { type: Sequelize.INTEGER }
})

TeacherModel.hasMany(ClassModel, {
  as: 'classes',
  foreignKey: 'classesFk'
})
GroupModel.hasMany(ClassModel, {
  as: 'classes',
  foreignKey: 'classesFk'
})
ClassModel.belongsTo(TeacherModel, {
  as: 'teacher',
  foreignKey: 'teacherFk'
})
ClassModel.belongsTo(GroupModel, 
  {
    as: 'group',
    foreignKey: 'groupFk'
  }
)

db.sync({force: false});

const Teacher = db.models.teacher
const Group = db.models.group
const Class = db.models.class

export { Teacher, Group, Class }
