import { EventInput } from '@fullcalendar/vue3'

let eventGuid = 0
const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'Projekt',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Spotkanie projekt',
    start: todayStr + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}
