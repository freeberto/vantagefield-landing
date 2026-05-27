const now = new Date()
const add = (h) => new Date(now.getTime() + h * 3_600_000).toISOString()

export const demoGuards = [
  { id: 'g1', name: 'Jane Doe',        phone: '(555) 234-5678', status: 'on_shift',  avatar: 'JD', qualification: 'Armed'   },
  { id: 'g2', name: 'Marcus Thompson', phone: '(555) 567-8901', status: 'available', avatar: 'MT', qualification: 'Armed'   },
  { id: 'g3', name: 'Sarah Chen',      phone: '(555) 678-9012', status: 'available', avatar: 'SC', qualification: 'Unarmed' },
]

export const demoLocations = [
  { id: 'l1', name: 'Riverside Tower', address: '123 River Walk, Chicago IL' },
  { id: 'l2', name: 'Westgate Mall',   address: '456 Commerce Blvd, Chicago IL' },
]

export const demoShifts = [
  { id: 's1', guard: demoGuards[0], location: demoLocations[0], start: add(-2),  end: add(6),  status: 'active'    },
  { id: 's2', guard: demoGuards[1], location: demoLocations[1], start: add(2),   end: add(10), status: 'scheduled' },
  { id: 's3', guard: demoGuards[2], location: demoLocations[0], start: add(8),   end: add(16), status: 'scheduled' },
]

export const demoIncidents = [
  {
    id: 'i1',
    guard:    demoGuards[0].name,
    location: demoLocations[0].name,
    type:     'Trespassing',
    severity: 'Low',
    time:     add(-1),
    notes:    'Individual removed from premises without incident. No injuries reported.',
  },
]

export const demoNotificationLog = [
  { id: 'n1', to: demoGuards[0].name,  message: 'Reminder: Your shift at Riverside Tower starts in 2 hours.',        time: add(-3),   type: 'reminder' },
  { id: 'n2', to: demoGuards[2].name,  message: 'Upcoming shift at Riverside Tower tomorrow at 8:00 AM. Be ready!',   time: add(-5),   type: 'reminder' },
  { id: 'n3', to: 'Admin',             message: 'ALERT: Jane Doe has been clocked in for 6+ hours. Review if needed.', time: add(-0.5), type: 'alert'    },
]
