import { ref, onMounted } from "vue";
import {
  fetchEvents,
  storeEvent,
  mutateEvent,
  destroyEvent,
} from "@/apis/events.js";

// eslint-disable-next-line
export function useEvents() {
  const getEvents = ref([]);

  const setEvents = async () => {
    getEvents.value = await fetchEvents();
  };

  const createEvent = (event) => {
    storeEvent(event);
  };

  const updateEvent = (event, id) => {
    mutateEvent(event, id);
  };

  const deleteEvent = (id) => {
    destroyEvent(id);
  };

  onMounted(setEvents);

  return {
    getEvents,
    setEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
