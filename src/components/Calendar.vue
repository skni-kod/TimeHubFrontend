<script setup>
import { ref, reactive, watch } from 'vue'
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { useEvents } from '@/composables/useEvents.js'

const id = ref(10)

const { getEvents, createEvent, updateEvent, deleteEvent } = useEvents()

const options = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek,listDay'
  },
  editable: true,
  selectable: true,
  weekends: true,
  select: (arg) => { //dateClick: addNewDate,
    id.value = id.value + 1
    
    const cal = arg.view.calendar
    cal.unselect()
    cal.addEvent({
      id: `${id.value}`,
      title: `New event ${id.value}`,
      start: arg.start,
      end: arg.end,
      allDay: true
    })
  },
  eventClick: (arg) => {
    if(arg.event) {
      arg.event.remove()
    }
  },
  events: [],
  eventAdd: (arg) => {
    createEvent({
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      allDay: arg.event.allDay
    })
  },
  eventChange: (arg) => {
    updateEvent({
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      allDay: arg.event.allDay
    }, arg.event.id)
  },
  eventRemove: (arg) => {
    deleteEvent(arg.event.id)
  }
})

options.events = getEvents.value
watch(getEvents, () => {
  options.events = getEvents.value
})
</script>

<template>
  <FullCalendar class="calendar" :options="options" />
</template>

<style scoped>
  .calendar {
    max-width: 800px;
    margin: 0 auto;
  }
</style>