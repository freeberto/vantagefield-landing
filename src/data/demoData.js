const now = new Date()
const add = (h) => new Date(now.getTime() + h * 3_600_000).toISOString()

export const demoGuards = [
  { id: 'g1', name: 'Jane Doe',        phone: '(555) 234-5678', status: 'on_shift',  avatar: 'JD' },
  { id: 'g2', name: 'John Doe',        phone: '(555) 345-6789', status: 'available', avatar: 'JD' },
  { id: 'g3', name: 'Maria Garcia',    phone: '(555) 456-7890', status: 'on_shift',  avatar: 'MG' },
  { id: 'g4', name: 'Marcus Thompson', phone: '(555) 567-8901', status: 'off_duty',  avatar: 'MT' },
  { id: 'g5', name: 'Sarah Chen',      phone: '(555) 678-9012', status: 'available', avatar: 'SC' },
]

export const demoLocations = [
  { id: 'l1', name: 'Riverside Tower',      address: '123 River Walk, Chicago IL' },
  { id: 'l2', name: 'Westgate Mall',        address: '456 Commerce Blvd, Chicago IL' },
  { id: 'l3', name: 'Harbor Point Office',  address: '789 Harbor Dr, Chicago IL' },
]

export const demoShifts = [
  { id: 's1', guard: demoGuards[0], location: demoLocations[0], start: add(-2),  end: add(6),  status: 'active' },
  { id: 's2', guard: demoGuards[2], location: demoLocations[1], start: add(-1),  end: add(7),  status: 'active' },
  { id: 's3', guard: demoGuards[1], location: demoLocations[2], start: add(2),   end: add(10), status: 'scheduled' },
  { id: 's4', guard: demoGuards[3], location: demoLocations[0], start: add(8),   end: add(16), status: 'scheduled' },
  { id: 's5', guard: demoGuards[4], location: demoLocations[1], start: add(-8),  end: add(0),  status: 'completed' },
  { id: 's6', guard: demoGuards[1], location: demoLocations[2], start: add(14),  end: add(22), status: 'scheduled' },
]

export const demaSmsLog = [
  { id: 'm1', to: demoGuards[0].name, message: 'Reminder: Your shift at Riverside Tower starts in 2 hours.', time: add(-3), status: 'delivered' },
  { id: 'm2', to: demoGuards[4].name, message: 'Your shift at Westgate Mall has ended. Great work!',          time: add(-0.5), status: 'delivered' },
  { id: 'm3', to: 'Admin',            message: 'ALERT: Marcus Thompson clocked in 300ft outside of Harbor Point Office.', time: add(-5), status: 'delivered' },
]
