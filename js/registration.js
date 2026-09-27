// ======================================
// GET EVENTS
// ======================================

let events = JSON.parse(
    localStorage.getItem("events")
) || [

    {
        id: 1,
        name: "Web Development Workshop",
        date: "2026-09-28",
        venue: "AITR Seminar Hall",
        speaker: "Rahul Sharma",
        capacity: 100,
        registrations: 5,
        status: "Upcoming"
    },

    {
        id: 2,
        name: "Cyber Security Workshop",
        date: "2026-09-18",
        venue: "Computer Lab 2",
        speaker: "Amit Kumar",
        capacity: 80,
        registrations: 5,
        status: "Completed"
    },

    {
        id: 3,
        name: "AI & ML Workshop",
        date: "2026-10-05",
        venue: "Lab 1",
        speaker: "Neha Singh",
        capacity: 60,
        registrations: 5,
        status: "Ongoing"
    },

    {
        id: 4,
        name: "Web Design Workshop",
        date: "2026-09-10",
        venue: "Lab 3",
        speaker: "Priya Mehta",
        capacity: 60,
        registrations: 5,
        status: "Completed"
    },

    {
        id: 5,
        name: "DSA Workshop",
        date: "2026-08-25",
        venue: "Seminar Hall",
        speaker: "Rohit Verma",
        capacity: 100,
        registrations: 5,
        status: "Completed"
    }

];



// ======================================
// GET SELECTED EVENT
// ======================================

let selectedEventId =
    localStorage.getItem("selectedEventId");



// ======================================
// GET REGISTRATIONS
// ======================================

let registrations =
    JSON.parse(
        localStorage.getItem("registrations")
    ) || {};



// ======================================
// CREATE 5 SAMPLE STUDENTS
// ======================================

function createSampleRegistrations() {

    events.forEach(function(event) {

        if (!registrations[event.id]) {

            registrations[event.id] = [

                {
                    id: 1,
                    name: "Rahul Sharma",
                    email: "rahul@gmail.com",
                    college: "Acropolis Institute of Technology"
                },

                {
                    id: 2,
                    name: "Aman Verma",
                    email: "aman@gmail.com",
                    college: "IPS Academy"
                },

                {
                    id: 3,
                    name: "Priya Singh",
                    email: "priya@gmail.com",
                    college: "Medicaps University"
                },

                {
                    id: 4,
                    name: "Rohit Patel",
                    email: "rohit@gmail.com",
                    college: "SAGE University"
                },

                {
                    id: 5,
                    name: "Anjali Sharma",
                    email: "anjali@gmail.com",
                    college: "Acropolis Institute of Technology"
                }

            ];

        }

    });


    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );

}



// ======================================
// EVENT DROPDOWN
// ======================================

const eventSelect =
    document.getElementById("eventSelect");


function loadEvents() {

    eventSelect.innerHTML = `
        <option value="">
            Select Event
        </option>
    `;


    events.forEach(function(event) {

        let option =
            document.createElement("option");

        option.value = event.id;

        option.textContent = event.name;

        eventSelect.appendChild(option);

    });


    // Select event that was clicked
    // from Home page

    if (selectedEventId) {

        eventSelect.value =
            selectedEventId;

    }

}



// ======================================
// DISPLAY REGISTRATION LIST
// ======================================

const registrationLists =
    document.getElementById(
        "registrationLists"
    );


function displayRegistrations() {

    registrationLists.innerHTML = "";


    events.forEach(function(event) {

        let students =
            registrations[event.id] || [];


        let rows = "";


        students.forEach(function(student, index) {

            rows += `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${student.name}
                    </td>

                    <td>
                        ${student.email}
                    </td>

                    <td>
                        ${student.college}
                    </td>

                </tr>

            `;

        });


        registrationLists.innerHTML += `

            <div class="event-registration">

                <div class="event-registration-header">

                    <h3>
                        ${event.name}
                    </h3>

                    <span class="registration-count">

                        ${students.length}
                        Registrations

                    </span>

                </div>


                <table class="registration-table">

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>
                                Student Name
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                College
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${rows}

                    </tbody>

                </table>

            </div>

        `;

    });

}



// ======================================
// REGISTER NEW STUDENT
// ======================================

const registrationForm =
    document.getElementById(
        "registrationForm"
    );


registrationForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        let name =
            document.getElementById(
                "studentName"
            ).value.trim();


        let email =
            document.getElementById(
                "studentEmail"
            ).value.trim();


        let college =
            document.getElementById(
                "college"
            ).value.trim();


        let eventId =
            eventSelect.value;


        if (!eventId) {

            alert(
                "Please select an event."
            );

            return;

        }


        // Create array if it doesn't exist

        if (!registrations[eventId]) {

            registrations[eventId] = [];

        }


        // Create student

        let student = {

            id: Date.now(),

            name: name,

            email: email,

            college: college

        };


        // Add student

        registrations[eventId].push(
            student
        );


        // Save registrations

        localStorage.setItem(
            "registrations",
            JSON.stringify(registrations)
        );


        // Update event registration count

        let selectedEvent =
            events.find(function(event) {

                return event.id == eventId;

            });


        if (selectedEvent) {

            selectedEvent.registrations =
                registrations[eventId].length;

        }


        // Save events

        localStorage.setItem(
            "events",
            JSON.stringify(events)
        );


        alert(
            "Student registered successfully!"
        );


        // Clear form

        registrationForm.reset();


        // Keep selected event

        eventSelect.value = eventId;


        // Refresh registration list

        displayRegistrations();

    }
);



// ======================================
// START
// ======================================

createSampleRegistrations();

loadEvents();

displayRegistrations();