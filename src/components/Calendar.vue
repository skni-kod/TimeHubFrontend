<script lang='ts'>
import { defineComponent, ref } from 'vue'
import '@fullcalendar/core/vdom'
import FullCalendar, { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '@/event-utils'
import { onMounted } from 'vue';
import axios from 'axios';
import event from '@/models/event'
import store from "../store";
import { mapGetters } from "vuex";

const id = ref(1)

const events = ref([

]);




const Demo = defineComponent({
  components: {
    FullCalendar,
  },
    created() {
    axios.get('https://projekt-timehub.herokuapp.com/api/uzytkownikNotatki/', {headers: {
        Authorization: 'Bearer ' + this.token,
      }}).then((Data)=>{
      this.calendarOptions.events = Data.data.map((e: event)=>{
        return{
        id: e.id,
        title: e.zawartosc,
        start: e.data_rozpoczecia,
        end: e.data_zakonczenia,
        allDay: true
        }
      });
  })
  .catch(error=>console.log(error));
},
computed: { ...mapGetters({ token: "getToken" }) },
  data() {
    return {
      events,
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents

      } as CalendarOptions,
      currentEvents: [] as EventApi[],
    }
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleEventClick(clickInfo: EventClickArg) {
      //console.log(clickInfo);
      if (confirm(`Potwierdz usuniecie wydarzenia: '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
        axios.delete(`https://projekt-timehub.herokuapp.com/api/notatka/${clickInfo.event._def.publicId}/`)
      }
    },
    handleEvents(events: EventApi[]) {
      this.currentEvents = events
    },   
  }
})
export default Demo
</script>

<template>
  <div class='demo-app'>
    <div class='demo-app-sidebar'>
      <div class='demo-app-sidebar-section'>
        <h2>Instrukcja</h2>
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
  max-width: 1100px;
  margin: 0 auto;
}

</style>