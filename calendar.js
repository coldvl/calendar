const eventList = [
  {
    "eventType": "Daily Standup",
    "day": "mon",
    "time": "11",
    "participants": ["Bob"]
  },
  {
    "eventType": "Planning Session",
    "day": "wed",
    "time": "13",
    "participants": ["Marry"]
  },
  {
    "eventType": "Retrospective",
    "day": "fri",
    "time": "17",
    "participants": ["Marry", "Bob"]
  }
]

window.addEventListener("load", () => {
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
      renderCalendarPage()
    } else {
      alert('Event is already existing')
    }
  }

  const cancelEventFunction = (e) => {
    e.preventDefault();
    renderCalendarPage()
  }
  
  const clickFunction = (e) => {
    e.preventDefault();
    renderCreateEventPage()
  }

  const renderCreateEventPage = () => {
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
        subscribeToCreatePageEvents()
      }
    )
  }

  const renderCalendarPage = () => {
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
        subscribeToCalendarPageEvents();
      }
    )
  }

  const subscribeToCalendarPageEvents = () => {
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

  const subscribeToCreatePageEvents = () => {
    const submitButton = document.getElementById("event-form-submit")
    submitButton.onclick = createEventFunction;

    const cancelButton = document.getElementById("event-form-cancel")
    cancelButton.onclick = cancelEventFunction;
  }

  renderCalendarPage()
})
