<script setup>
import { ref, reactive, watch } from 'vue'
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { useEvents } from '@/composables/useEvents.js'
import axios from 'axios';
import { onMounted } from "vue";

onMounted(() => {
  axios.get('https://projekt-timehub.herokuapp.com/api/uzytkownikNotatki/', {headers: {
        Authorization: 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NjcwNDA5LCJpYXQiOjE2NTU2NjY4MDksImp0aSI6IjIzZGQyZjhiYTY1NzRhZGZiZDI4YWVjZjliYzlmMTU1IiwidXNlcl9pZCI6Mn0.KOuK4rypXtDYxgYs-kQZpWc831ueNxQeiQ8EfZFH5-o",
      }}).then(Data=>{
    console.log(Data);
    options.events = Data.data.map(e=>{
      return{
      id: e.id,
      title: e.zawartosc,
      start: e.data_rozpoczecia,
      end: e.data_zakonczenia,
      allDay: true
      }
    });
  })
  .catch(error=>console.log(error))
})

const id = ref(10)

const events = ref([

]);

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
  <FullCalendar class="calendar" :options="options"/>
</template>

<style scoped>
  .calendar {
    max-width: 800px;
    margin: 0 auto;
  }
</style>