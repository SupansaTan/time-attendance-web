export default {
  items: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: 'bi bi-display'
    },
    {
      id: 'assign-plan',
      title: 'Assign Plan',
      type: 'collapse',
      url: '/assign-plan',
      icon: 'bi bi-pen',
      children: [
        {
          id: 'assgin-shift',
          title: 'Assign Shift',
          type: 'item',
          url: '#'
        },
        {
          id: 'assgin-ot',
          title: 'Assign OT',
          type: 'item',
          url: '#'
        }
      ]
    }
  ]
}
