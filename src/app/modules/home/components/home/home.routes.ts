import { AUTH_ROLE } from '../../../../auths';
export const ROUTES = [
  {
    name: 'Trang chủ',
    link: '/',
    icon: 'home'
  },
  {
    name: 'Nhân sự',
    link: '/staff',
    icon: 'account_box',
    permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
  },
  {
    name: 'Sinh viên',
    link: '/student',
    icon: 'graduated',
    svg: true,
    permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
  },
  {
    name: 'Thực tập',
    link: '/intership',
    icon: 'clipboard',
    svg: true,
    permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
  },
  {
    name: 'Khóa học',
    link: '/employee-course',
    icon: 'course',
    svg: true,
    permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
  },
  {
    name: 'Thống kê',
    icon: 'bar_chart',
    permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM],
    links: [
      {
        name: 'Thống kê khóa học',
        link: '/course-report-by-facutly',
        icon: 'bar_chart',
        permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
      },
      {
        name: 'Thống kê khóa học của nhân viên',
        link: '/course-report-by-employee',
        icon: 'bar_chart',
        permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
      },
      {
        name: 'Thống kê sinh viên thực tập',
        link: '/intership-report-by-student',
        icon: 'bar_chart',
        permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
      },

      {
        name: 'Thống kê sinh viên thực tập theo trường',
        link: '/intership-report-by-center',
        icon: 'bar_chart',
        permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
      },
      {
        name: 'Thống kê sinh viên thực tập trong khoa',
        link: '/intership-report-by-facutly',
        icon: 'bar_chart',
        permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
      },
    ]
  },
  {
    name: 'Cấu hình',
    icon: 'settings',
    permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM],
    links: [
      {
        name: 'Trường',
        link: '/center',
        icon: 'center',
        svg: true,
        permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM]
      },
      {
        name: 'Khoa',
        link: '/facutly',
        icon: 'apartment',
        permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM]
      },
      {
        name: 'Chuyên môn',
        link: '/major',
        icon: 'education',
        svg: true,
        permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM]
      },
      {
        name: 'Trình độ',
        link: '/level',
        icon: 'level',
        svg: true,
        permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM]
      },
      {
        name: 'Khóa đào tạo',
        link: '/course',
        icon: 'access_time',
        permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM]
      }
    ]
  },
];
