<script setup>
import { ref, reactive, watch } from 'vue'
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
<<<<<<< Updated upstream
import { useEvents } from '@/composables/useEvents.js'

const id = ref(10)
=======
import { INITIAL_EVENTS, createEventId } from '@/event-utils'
import { onMounted } from 'vue';
import axios from 'axios';
import {AxiosResponse} from 'axios'
import  event  from '@/models/event'

const id = ref(1)
>>>>>>> Stashed changes

const { getEvents, createEvent, updateEvent, deleteEvent } = useEvents()

<<<<<<< Updated upstream
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
=======
]);

onMounted(() => {
  axios.get('https://projekt-timehub.herokuapp.com/api/uzytkownikNotatki/', {headers: {
        Authorization: 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NzE0MzA0LCJpYXQiOjE2NTU3MTA3MDQsImp0aSI6IjRkMGM4MzMxMzdmMzQ0ODk4MWFkMDQyY2MwYTc5YmNlIiwidXNlcl9pZCI6Mn0.k0VO6hXkS15RIUKuKwOFlzZUrEx_9kW2BYelcRlqW5s",
      }}).then(Data=>{
    console.log(Data);
    Demo.events = Data.data.map((e: event)=>{
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

const Demo = defineComponent({
  components: {
    FullCalendar,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  <FullCalendar class="calendar" :options="options" />
</template>

<style scoped>
  .calendar {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
=======
  <div class='demo-app'>
    <div class='demo-app-sidebar'>
      <div class='demo-app-sidebar-section'>
        <h2>Instrukcja obsługi</h2>
        <ul>
          <li>Wybierz daty i zostanie wyświetlony komunikat o utworzeniu nowego wydarzenia</li>
          <li>Wydarzenia można przeciągać, upuszczac i zmieniac ich rozmiar</li>
          <li>Klikniecie na event spowoduje jego usuniecie</li>
        </ul>
      </div>
      <div class='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            :checked='calendarOptions.weekends'
            @change='handleWeekendsToggle'
          />
          Pokazanie weekend'ów
        </label>
      </div>
      <div class='demo-app-sidebar-section'>
        <h2> Wszystkie wydarzenia ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang='css'>

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc { /* the calendar root */
  max-width: 1000px;
  margin: 0 auto;
}

</style>
>>>>>>> Stashed changes
