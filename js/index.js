// ===============================
// EVENT DATA
// ===============================

// If your details.js already stores events in localStorage,
// this will use those events.
//
// Otherwise these sample events will be used.

let events = JSON.parse(localStorage.getItem("events")) || [

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
        name: "Cyber Security Workshop",
        date: "2026-09-18",
        venue: "Computer Lab 2",
        speaker: "Amit Kumar",
        capacity: 80,
        registrations: 80,
        status: "Completed"
    },

    {
        id: 3,
        name: "AI & ML Workshop",
        date: "2026-10-05",
        venue: "Lab 1",
        speaker: "Neha Singh",
        capacity: 60,
        registrations: 34,
        status: "Ongoing"
    },

    {
        id: 4,
        name: "Web Design Workshop",
        date: "2026-09-10",
        venue: "Lab 3",
        speaker: "Priya Mehta",
        capacity: 60,
        registrations: 60,
        status: "Completed"
    },

    {
        id: 5,
        name: "DSA Workshop",
        date: "2026-08-25",
        venue: "Seminar Hall",
        speaker: "Rohit Verma",
        capacity: 100,
        registrations: 100,
        status: "Completed"
    }

];


// ===============================
// SAVE EVENTS
// ===============================

localStorage.setItem(
    "events",
    JSON.stringify(events)
);


// ===============================
// GET HTML ELEMENTS
// ===============================

const totalEvents =
    document.getElementById("totalEvents");

const upcomingEvents =
    document.getElementById("upcomingEvents");

const ongoingEvents =
    document.getElementById("ongoingEvents");

const completedEvents =
    document.getElementById("completedEvents");

const activeEvents =
    document.getElementById("activeEvents");

const completedEventList =
    document.getElementById("completedEventList");


// ===============================
// UPDATE STATISTICS
// ===============================

function updateStatistics() {

    let upcoming = events.filter(
        event => event.status === "Upcoming"
    );

    let ongoing = events.filter(
        event => event.status === "Ongoing"
    );

    let completed = events.filter(
        event => event.status === "Completed"
    );


    totalEvents.textContent = events.length;

    upcomingEvents.textContent = upcoming.length;

    ongoingEvents.textContent = ongoing.length;

    completedEvents.textContent = completed.length;
}


// ===============================
// CREATE EVENT CARD
// ===============================

function createEventCard(event) {

    // Calculate registration percentage

    let percentage =
        (event.registrations / event.capacity) * 100;


    // Don't allow percentage above 100

    if (percentage > 100) {
        percentage = 100;
    }


    percentage = Math.round(percentage);


    // Status class

    let statusClass =
        event.status.toLowerCase();


    let cardClass = "";


    if (event.status === "Completed") {
        cardClass = "completed-card";
    }

    if (event.status === "Ongoing") {
        cardClass = "ongoing-card";
    }


    return `

        <div class="event-card ${cardClass}">

            <div class="card-top">

                <h3 class="event-title">
                    ${event.name}
                </h3>

                <span class="status ${statusClass}">
                    ${event.status}
                </span>

            </div>


            <div class="event-info">

                <div>
                    📅 Date:
                    ${event.date}
                </div>

                <div>
                    📍 Venue:
                    ${event.venue}
                </div>

                <div>
                    👤 Speaker:
                    ${event.speaker}
                </div>

                <div>
                    👥 Capacity:
                    ${event.capacity}
                </div>

            </div>


            <div class="progress-header">

                <span>
                    Registrations:
                    ${event.registrations} /
                    ${event.capacity}
                </span>

                <span>
                    ${percentage}%
                </span>

            </div>


            <div class="progress">

                <div
                    class="progress-bar"
                    style="width: ${percentage}%"
                ></div>

            </div>


            <button
                class="registration-btn"
                onclick="viewRegistrations(${event.id})"
            >
                👁 View Registrations
            </button>

        </div>

    `;
}


// ===============================
// DISPLAY EVENTS
// ===============================

function displayEvents() {

    activeEvents.innerHTML = "";

    completedEventList.innerHTML = "";


    // Upcoming + Ongoing

    let active = events.filter(
        event =>
            event.status === "Upcoming" ||
            event.status === "Ongoing"
    );


    // Completed

    let completed = events.filter(
        event =>
            event.status === "Completed"
    );


    // Display active events

    active.forEach(event => {

        activeEvents.innerHTML +=
            createEventCard(event);

    });


    // Display completed events

    completed.forEach(event => {

        completedEventList.innerHTML +=
            createEventCard(event);

    });


    // If no active events

    if (active.length === 0) {

        activeEvents.innerHTML = `
            <p>No upcoming events.</p>
        `;

    }


    // If no completed events

    if (completed.length === 0) {

        completedEventList.innerHTML = `
            <p>No completed events.</p>
        `;

    }

}


// ===============================
// VIEW REGISTRATIONS
// ===============================

function viewRegistrations(eventId) {

    // Save selected event

    localStorage.setItem(
        "selectedEventId",
        eventId
    );


    // Open registration page

    window.location.href =
        "registration.html";
}


// ===============================
// RUN FUNCTIONS
// ===============================

updateStatistics();

displayEvents();