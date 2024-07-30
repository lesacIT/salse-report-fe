export default [
  {
    title: 'Home',
    to: { name: 'root' },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: 'Phân Quyền',
    icon: { icon: 'tabler-menu-2' },
    children: [
      {
        title: 'Cấp 1.1',
        to: null,
      },
      {
        title: 'Cấp 1.2',
        children: [
          {
            title: 'Cấp 2.1',
            to: null,
          },
          {
            title: 'Cấp 2.2',
            to: null,
          },
        ],
      },
    ],
  },

  // {
  //   title: 'Second page',
  //   to: { name: 'second-page' },
  //   icon: { icon: 'tabler-file' },
  // },
  {
    title: 'Danh Sách Người Dùng',
    to: { name: 'list-user' },
    icon: { icon: 'tabler-user' },
  },
  {
    title: 'Danh Sách nhóm người dùng',
    to: { name: 'permissions-user' },
    icon: { icon: 'tabler-users-group' },
  },
  {
    title: 'Danh Sách Người Dùng',
    to: { name: 'role' },
    icon: { icon: 'tabler-users' },
  },
  {
    title: 'Nhóm Phân Quyền',
    to: { name: 'decentralized-group' },
    icon: { icon: 'tabler-lock-access' },
  },
  {
    title: 'Chi Tiết Người Dùng ',
    to: { name: 'user-profile' },
    icon: { icon: 'tabler-id-badge' },
  },
  {
    title: 'Lập Mục Tiêu',
    to: { name: 'goal-setting' },
    icon: { icon: 'tabler-calendar-check' },
  },
  {
    title: 'Danh Sách Mục Tiêu Hoạt Động',
    to: { name: 'target-list-act' },
    icon: { icon: 'tabler-list-check' },
  },
  {
    title: 'Danh Sách Mục Tiêu Kinh Doanh',
    to: { name: 'target-list-business' },
    icon: { icon: 'tabler-chart-line' },
  },
  {
    title: 'Danh Sách Báo Cáo Ngày',
    to: { name: 'daily-report-list' },
    icon: { icon: 'tabler-file-report' },
  },
  {
    title: 'Lập Mục Tiêu Kinh Doanh Ngày',
    to: { name: 'set-daily-business-goals' },
    icon: { icon: 'tabler-report-analytics' },
  },
  {
    title: 'Lập Mục Tiêu Hoạt Động Ngày',
    to: { name: 'set-daily-activity-goals' },
    icon: { icon: 'tabler-graph' },
  },
  {
    title: 'Báo Cáo Ngày',
    to: { name: 'daily-report' },
    icon: { icon: 'tabler-file-report' },
  },
  {
    title: 'Danh Mục Báo Cáo',
    to: { name: 'category-list-report' },
    icon: { icon: 'tabler-report-money' },
  },

  // {
  //   title: 'Test UI',
  //   to: { name: 'role copy' },
  //   icon: { icon: 'tabler-user' },
  // },
  {
    title: 'Biểu Đồ 1',
    to: { name: 'apex-chart' },
    icon: { icon: 'tabler-user' },
  },
  {
    title: 'Biểu Đồ 2',
    to: { name: 'chartjs' },
    icon: { icon: 'tabler-user' },
  },
  
  
  {
    title: 'Đăng Nhập ',
    to: { name: 'login' },
    icon: { icon: 'tabler-login' },
  },
  {
    title: 'Quên mật khẩu',
    to: { name: 'forgot-password' },
    icon: { icon: 'tabler-lock-open' },
  },
  {
    title: 'Danh sách điểm liên kết',
    to: { name: 'list-point-list' },
    icon: { icon: 'tabler-file' },
  },
  {
    title: 'Danh sách điểm liên kết2',
    to: { name: 'list-point-list-copy' },
    icon: { icon: 'tabler-file' },
  },
  {
    title: 'Thêm quyền',
    to: { name: 'list-permission' },
    icon: { icon: 'tabler-file' },
  },
  {
    title: 'Thêm Roles',
    to: { name: 'list-role' },
    icon: { icon: 'tabler-key' },
  },
  {
    title: 'User có roles',
    to: { name: 'list-role-user' },
    icon: { icon: 'tabler-user-role' },
  },

  // {
  //   title: 'Lịch Sử Hoạt Động ',
  //   to: { name: '[id]' },
  //   icon: { icon: 'tabler-user' },
  // },

]
  
