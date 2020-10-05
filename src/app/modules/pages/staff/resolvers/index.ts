import { StaffResolve, EmployeeDataResolve } from './staff.resolver';
import { StudentResolve, StudentDataResolve } from './student.resolver'
import { IntershipDataResolve, IntershipResolve } from './intership.resolver'
import { EmployeeCourseDataResolve, EmployeeCourseResolve } from './employee-course.resolver'

export { StaffResolve, EmployeeDataResolve } from './staff.resolver';
export { StudentResolve, StudentDataResolve } from './student.resolver'
export { IntershipDataResolve, IntershipResolve } from './intership.resolver'
export { EmployeeCourseDataResolve, EmployeeCourseResolve } from './employee-course.resolver'

export const RESOLVERS = [
  StaffResolve,
  EmployeeDataResolve,
  StudentResolve,
  StudentDataResolve,
  IntershipDataResolve,
  IntershipResolve,
  EmployeeCourseDataResolve,
  EmployeeCourseResolve
];
