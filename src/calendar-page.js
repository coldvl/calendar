import { eventList } from './constants.js'

const subscribeToCalendarPageEvents = (clickFunction) => {
  const newEventButton = document.getElementById('new-event-button')
  newEventButton.onclick = clickFunction;

  const cells = document.getElementsByClassName('cell')
  for(var i=0; i < cells.length; i++) {
    const cell = cells[i]
    const day = cell.getAttribute('data-day')
    const time = cell.getAttribute('data-time')
    const cellEvent = eventList.find((evnt) => {
      return evnt.day === day && evnt.time === time
    })
    if (cellEvent) {
      cell.innerHTML = cellEvent.eventType
    }
  }
}

export const renderCalendarPage = (renderCreateEventPage, redirectToCalendar) => {
  const clickFunction = (e) => {
    e.preventDefault();
    renderCreateEventPage(redirectToCalendar)
  }

  fetch('calendar-page-template.html').then(
    (response) => {
      return response.text()
    }
  ).then(
    (calendarPageTemplate) => {
      const container = document.getElementById('content-container')
      window.history.replaceState({}, 'Calendar', 'calendar.html');
      container.innerHTML = calendarPageTemplate
      $('.selectpicker').selectpicker();
      subscribeToCalendarPageEvents(clickFunction);
    }
  )
}
