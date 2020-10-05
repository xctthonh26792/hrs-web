import { FacutlyResolve, FacutlySelectizeResolve } from './facutly.resolver'
import { CenterResolve, CenterSelectizeResolve } from './center.resolver'
import { MajorResolve } from './major.resolver'
import { LevelResolve } from './level.resolver'
import { CourseResolve } from './course.resolver'

export { FacutlyResolve, FacutlySelectizeResolve } from './facutly.resolver'
export { CenterResolve, CenterSelectizeResolve } from './center.resolver'
export { MajorResolve } from './major.resolver'
export { LevelResolve } from './level.resolver'
export { CourseResolve } from './course.resolver'

export const RESOLVERS = [
  FacutlyResolve,
  FacutlySelectizeResolve,
  CenterSelectizeResolve,
  CenterResolve,
  MajorResolve,
  LevelResolve,
  CourseResolve
];
