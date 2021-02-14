import { renderCreateEventPage } from './create-event-page.js';
import { renderCalendarPage } from './calendar-page.js';

window.addEventListener("load", () => {
  const redirectToCalendar = () => {
    renderCalendarPage(renderCreateEventPage, redirectToCalendar)
  }
  
  renderCalendarPage(renderCreateEventPage, redirectToCalendar)
})
