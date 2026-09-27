// ==========================================
// GET EVENTS FROM LOCAL STORAGE
// ==========================================

let events = JSON.parse(
    localStorage.getItem("events")
) || [];


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");

const eventContainer =
    document.getElementById("eventContainer");

const resultCount =
    document.getElementById("resultCount");


// ==========================================
// DISPLAY EVENTS
// ==========================================

function displayEvents() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const selectedStatus =
        statusFilter.value;


    // FILTER EVENTS

    const filteredEvents = events.filter(function(event) {

        const eventName =
            event.name.toLowerCase();

        const matchesSearch =
            eventName.includes(searchText);


        const matchesStatus =
            selectedStatus === "All" ||
            event.status === selectedStatus;


        return matchesSearch && matchesStatus;

    });


    // CLEAR OLD CARDS

    eventContainer.innerHTML = "";


    // RESULT COUNT

    resultCount.textContent =
        filteredEvents.length + " events found";


    // NO RESULTS

    if (filteredEvents.length === 0) {

        eventContainer.innerHTML = `

            <div class="no-results">

                <h3>No events found</h3>

                <p>
                    Try another search or filter.
                </p>

            </div>

        `;

        return;

    }


    // CREATE CARDS

    filteredEvents.forEach(function(event) {

        // Calculate registration percentage

        let progress = 0;

        if (event.capacity > 0) {

            progress =
                Math.round(
                    (event.registrations /
                    event.capacity) * 100
                );

        }


        // Don't allow more than 100%

        if (progress > 100) {

            progress = 100;

        }


        // Status class

        let statusClass = "";

        if (event.status === "Upcoming") {

            statusClass = "status-upcoming";

        }

        else if (event.status === "Ongoing") {

            statusClass = "status-ongoing";

        }

        else if (event.status === "Completed") {

            statusClass = "status-completed";

        }


        // CREATE CARD

        eventContainer.innerHTML += `

            <div class="event-card">

                <div class="event-header">

                    <h3>
                        ${event.name}
                    </h3>

                    <span class="status ${statusClass}">
                        ${event.status}
                    </span>

                </div>


                <div class="event-info">

                    <p>
                        📅 Date: ${event.date}
                    </p>

                    <p>
                        📍 Venue: ${event.venue}
                    </p>

                    <p>
                        👤 Speaker: ${event.speaker}
                    </p>

                    <p>
                        👥 Capacity: ${event.capacity}
                    </p>

                </div>


                <div class="progress-info">

                    <span>
                        Registrations:
                        ${event.registrations}
                        / ${event.capacity}
                    </span>

                    <span>
                        ${progress}%
                    </span>

                </div>


                <div class="progress-bar">

                    <div
                        class="progress"
                        style="width: ${progress}%">
                    </div>

                </div>


                <button
                    class="registration-btn"
                    onclick="viewRegistrations(${event.id})">

                    👁 View Registrations

                </button>

            </div>

        `;

    });

}


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    displayEvents
);


// ==========================================
// FILTER
// ==========================================

statusFilter.addEventListener(
    "change",
    displayEvents
);


// ==========================================
// VIEW REGISTRATIONS
// ==========================================

function viewRegistrations(eventId) {

    localStorage.setItem(
        "selectedEventId",
        eventId
    );


    window.location.href =
        "registration.html";

}


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayEvents();