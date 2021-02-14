import { eventList } from './constants.js'

const subscribeToCreatePageEvents = (redirectToCalendar) => {
  const cancelEventFunction = (e) => {
    e.preventDefault();
    redirectToCalendar()
  }

  const createEventFunction = (e) => {
    e.preventDefault();
    const eventForm = document.getElementById("create-event-form")
    const formData = new FormData(eventForm)

    const jsonData = Object.fromEntries(formData.entries());
    jsonData.participants = formData.getAll('participants');

    const existing_event = eventList.find((listItem) => {
      return listItem.day === jsonData.day && listItem.time === jsonData.time
    })

    if (!existing_event) {
      eventList.push(jsonData);
      redirectToCalendar()
    } else {
      alert('Event is already existing')
    }
  }

  const submitButton = document.getElementById("event-form-submit")
  submitButton.onclick = createEventFunction;

  const cancelButton = document.getElementById("event-form-cancel")
  cancelButton.onclick = cancelEventFunction;
}

export const renderCreateEventPage = (redirectToCalendar) => {
  fetch('create-event-template.html').then(
    (response) => {
      return response.text()
    }
  ).then(
    (createEventTemplate) => {
      const container = document.getElementById('content-container')
      window.history.replaceState({}, 'Create Event', 'create-event.html');
      container.innerHTML = createEventTemplate
      $('.selectpicker').selectpicker();
      subscribeToCreatePageEvents(redirectToCalendar)
    }
  )
}
