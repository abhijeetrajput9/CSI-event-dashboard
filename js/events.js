
const form = document.getElementById("event-form");
const eventContainer = document.getElementById("event-container");


// Default events
const defaultEvents = [
    {
        id: 1,
        name: "Web Development Workshop",
        date: "2026-09-28",
        venue: "AITR Seminar Hall",
        speaker: "Rahul Sharma",
        capacity: 100,
        registrations: 72,
        status: "Upcoming"
    },

    {
        id: 2,
        name: "AI & Machine Learning Seminar",
        date: "2026-10-05",
        venue: "Main Auditorium",
        speaker: "Priya Mehta",
        capacity: 150,
        registrations: 110,
        status: "Upcoming"
    },

    {
        id: 3,
        name: "Hackathon 2026",
        date: "2026-10-12",
        venue: "Innovation Lab",
        speaker: "Arjun Verma",
        capacity: 200,
        registrations: 165,
        status: "Upcoming"
    },

    {
        id: 4,
        name: "Cyber Security Workshop",
        date: "2026-09-18",
        venue: "Computer Lab 2",
        speaker: "Amit Kumar",
        capacity: 80,
        registrations: 80,
        status: "Completed"
    }
];


// Get events from localStorage
// If nothing exists, use default events
let events = JSON.parse(localStorage.getItem("events")) || defaultEvents;


// Save default events to localStorage
if (!localStorage.getItem("events")) {
    localStorage.setItem("events", JSON.stringify(events));
}


let editingEventId = null;


// Display events on Event Management page
function displayEvents() {

    eventContainer.innerHTML = "";

    events.forEach(function(event) {

        const card = document.createElement("div");

        card.classList.add("event-card");

        const percentage =
            (event.registrations / event.capacity) * 100;

        card.innerHTML = `
            <h3>${event.name}</h3>

            <p>📅 Date: ${event.date}</p>
            <p>📍 Venue: ${event.venue}</p>
            <p>👤 Speaker: ${event.speaker}</p>
            <p>👥 Capacity: ${event.capacity}</p>
            <p>📝 Registrations: ${event.registrations}</p>
            <p>📊 Registration Progress: ${Math.round(percentage)}%</p>
            <p>📌 Status: ${event.status}</p>

            <div class="card-buttons">

                <button 
                    class="edit-btn"
                    onclick="editEvent(${event.id})">
                    Edit
                </button>

                <button 
                    class="delete-btn"
                    onclick="deleteEvent(${event.id})">
                    Delete
                </button>

            </div>
        `;

        eventContainer.appendChild(card);
    });
}


// ADD / EDIT EVENT
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("event-name").value;

    const date =
        document.getElementById("event-date").value;

    const venue =
        document.getElementById("event-venue").value;

    const speaker =
        document.getElementById("event-speaker").value;

    const capacity =
        Number(document.getElementById("event-capacity").value);

    const registrations =
        Number(document.getElementById("event-registrations").value);

    const status =
        document.getElementById("event-status").value;


    // EDIT
    if (editingEventId !== null) {

        const eventToEdit = events.find(function(event) {
            return event.id === editingEventId;
        });

        eventToEdit.name = name;
        eventToEdit.date = date;
        eventToEdit.venue = venue;
        eventToEdit.speaker = speaker;
        eventToEdit.capacity = capacity;
        eventToEdit.registrations = registrations;
        eventToEdit.status = status;

        editingEventId = null;

    }

    // ADD
    else {

        const newEvent = {

            id: Date.now(),

            name: name,
            date: date,
            venue: venue,
            speaker: speaker,
            capacity: capacity,
            registrations: registrations,
            status: status
        };

        events.push(newEvent);
    }


    // IMPORTANT:
    // Save updated events
    // into localStorage

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );


    displayEvents();

    form.reset();

    document.getElementById("form-title").textContent =
        "Add Event";

    document.querySelector(".save-btn").textContent =
        "Add Event";
});


// EDIT EVENT
function editEvent(id) {

    const event = events.find(function(event) {
        return event.id === id;
    });


    document.getElementById("event-name").value =
        event.name;

    document.getElementById("event-date").value =
        event.date;

    document.getElementById("event-venue").value =
        event.venue;

    document.getElementById("event-speaker").value =
        event.speaker;

    document.getElementById("event-capacity").value =
        event.capacity;

    document.getElementById("event-registrations").value =
        event.registrations;

    document.getElementById("event-status").value =
        event.status;


    editingEventId = id;


    document.getElementById("form-title").textContent =
        "Edit Event";

    document.querySelector(".save-btn").textContent =
        "Save Changes";


    document
        .querySelector(".event-form-container")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// DELETE EVENT
function deleteEvent(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this event?");

    if (!confirmDelete) {
        return;
    }


    events = events.filter(function(event) {

        return event.id !== id;

    });


    // IMPORTANT:
    // Save after deleting

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );


    displayEvents();
}


// CANCEL
document
    .getElementById("cancel-btn")
    .addEventListener("click", function() {

        form.reset();

        editingEventId = null;

        document.getElementById("form-title").textContent =
            "Add Event";

        document.querySelector(".save-btn").textContent =
            "Add Event";
    });


// Show events when page opens
displayEvents();
