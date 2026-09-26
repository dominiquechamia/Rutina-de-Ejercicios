// ==========================================
// ✦ SPARKLE ROUTINE ✦
// app.js
// ==========================================


// ==========================================
// 1. ENTRENAMIENTOS
// ==========================================

const workouts = [
    {
        id: 1,
        day: "Martes",
        title: "Brazos + espalda + abdomen",
        duration: "30 min",
        video: "PEGA_AQUI_EL_LINK_DEL_MARTES"
    },

    {
        id: 2,
        day: "Jueves",
        title: "Brazos",
        duration: "12 min",
        video: "PEGA_AQUI_EL_LINK_DEL_JUEVES"
    },

    {
        id: 3,
        day: "Viernes",
        title: "Glúteos",
        duration: "29 min",
        video: "PEGA_AQUI_EL_LINK_DEL_VIERNES"
    },

    {
        id: 4,
        day: "Domingo",
        title: "Full Body + abdomen",
        duration: "21 min",
        video: "PEGA_AQUI_EL_LINK_DEL_DOMINGO"
    }
];


// ==========================================
// 2. DÍA ACTUAL
// ==========================================

const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
];

const today = new Date();
const todayName = days[today.getDay()];


// ==========================================
// 3. RECUPERAR PROGRESO GUARDADO
// ==========================================

let completedWorkouts = [];

try {
    completedWorkouts =
        JSON.parse(
            localStorage.getItem("completedWorkouts")
        ) || [];
}
catch (error) {
    completedWorkouts = [];
}


// ==========================================
// 4. ELEMENTOS HTML
// ==========================================

const container =
    document.getElementById("workout-container");

const progressNumber =
    document.getElementById("progress-number");

const progressBar =
    document.getElementById("progress");

const progressMessage =
    document.getElementById("progress-message");

const stars =
    document.getElementById("stars");

const streak =
    document.getElementById("streak");

const resetButton =
    document.getElementById("reset-week");


// ==========================================
// 5. CREAR TARJETAS
// ==========================================

function renderWorkouts() {

    if (!container) {
        console.error(
            "No existe #workout-container en index.html"
        );
        return;
    }

    container.innerHTML = "";


    workouts.forEach(workout => {

        const completed =
            completedWorkouts.includes(workout.id);

        const isToday =
            workout.day === todayName;


        const card =
            document.createElement("article");


        card.classList.add("workout-card");


        if (completed) {
            card.classList.add("completed");
        }


        if (isToday) {
            card.classList.add("today");
        }


        card.innerHTML = `

            <div class="workout-top">

                <div class="workout-day">

                    ${
                        isToday
                            ? '<span class="today-label">✦ HOY</span>'
                            : ''
                    }

                    <span class="day">
                        ${workout.day}
                    </span>

                </div>


                <span class="card-star">
                    ${completed ? "⭐" : "✦"}
                </span>

            </div>


            <h2>
                ${workout.title}
            </h2>


            <p class="duration">
                ⏱ ${workout.duration}
            </p>


            <div class="buttons">

                <a
                    href="${workout.video}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="video-button"
                >
                    ▶ Ver rutina
                </a>


                <button
                    class="complete-button"
                    onclick="toggleWorkout(${workout.id})"
                >
                    ${
                        completed
                            ? "✓ Completado"
                            : "Marcar completado"
                    }
                </button>

            </div>
        `;


        container.appendChild(card);
    });


    updateProgress();
}


// ==========================================
// 6. COMPLETAR / DESMARCAR
// ==========================================

function toggleWorkout(id) {

    if (completedWorkouts.includes(id)) {

        completedWorkouts =
            completedWorkouts.filter(
                workoutId => workoutId !== id
            );

    } else {

        completedWorkouts.push(id);
    }


    localStorage.setItem(
        "completedWorkouts",
        JSON.stringify(completedWorkouts)
    );


    renderWorkouts();
}


// Necesario para onclick=""
window.toggleWorkout = toggleWorkout;


// ==========================================
// 7. ACTUALIZAR PROGRESO
// ==========================================

function updateProgress() {

    const completed =
        completedWorkouts.length;

    const total =
        workouts.length;

    const percentage =
        (completed / total) * 100;


    if (progressNumber) {
        progressNumber.textContent =
            `${completed} / ${total}`;
    }


    if (progressBar) {
        progressBar.style.width =
            `${percentage}%`;
    }


    if (stars) {
        stars.textContent = completed;
    }


    /*
       La racha real todavía no está programada.
       Por ahora queda en 0.
    */

    if (streak) {
        streak.textContent = "0";
    }


    if (!progressMessage) {
        return;
    }


    if (completed === 0) {

        progressMessage.textContent =
            "Tu aventura comienza aquí ✨";

    }

    else if (completed === 1) {

        progressMessage.textContent =
            "Una estrella conseguida ✦";

    }

    else if (completed === 2) {

        progressMessage.textContent =
            "¡Mitad de la semana completada! 💜";

    }

    else if (completed === 3) {

        progressMessage.textContent =
            "Te queda solo una misión ✨";

    }

    else {

        progressMessage.textContent =
            "¡Semana encantada completada! ⭐";

    }
}


// ==========================================
// 8. REINICIAR SEMANA
// ==========================================

if (resetButton) {

    resetButton.addEventListener(
        "click",
        () => {

            const confirmation =
                confirm(
                    "¿Quieres comenzar una nueva semana?"
                );


            if (!confirmation) {
                return;
            }


            completedWorkouts = [];


            localStorage.removeItem(
                "completedWorkouts"
            );


            renderWorkouts();
        }
    );
}


// ==========================================
// 9. SONIDO MÁGICO
// ==========================================

const sparkleSound =
    new Audio("./sounds/sparkle.mp3");

sparkleSound.preload = "auto";

sparkleSound.volume = 0.25;


// ==========================================
// 10. BRILLITOS EN TWILIGHT
// ==========================================

const sparkleImages =
    document.querySelectorAll(
        ".sparkle-image"
    );


sparkleImages.forEach(image => {

    image.addEventListener(
        "click",
        event => {

            // SONIDO

            const sound =
                sparkleSound.cloneNode();

            sound.volume = 0.25;

            sound.play().catch(() => {
                console.log(
                    "No se pudo reproducir sparkle.mp3"
                );
            });


            // BRILLITOS

            createSparkleBurst(event);


            // MINI REBOTE

            image.classList.remove(
                "sparkle-pop"
            );

            void image.offsetWidth;

            image.classList.add(
                "sparkle-pop"
            );


            setTimeout(
                () => {
                    image.classList.remove(
                        "sparkle-pop"
                    );
                },
                400
            );
        }
    );

});


// ==========================================
// 11. CREAR BRILLITOS
// ==========================================

function createSparkleBurst(event) {

    const sparkleCount = 18;

    const x = event.clientX;
    const y = event.clientY;


    const symbols = [
        "✦",
        "✨",
        "★",
        "⋆",
        "💜"
    ];


    const colors = [
        "#ffffff",
        "#ffd8f4",
        "#ef8ddd",
        "#d1a4ff",
        "#a77cff",
        "#7b58d1"
    ];


    for (
        let i = 0;
        i < sparkleCount;
        i++
    ) {

        const sparkle =
            document.createElement("span");


        sparkle.className =
            "sparkle-burst";


        sparkle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        sparkle.style.left =
            `${x}px`;

        sparkle.style.top =
            `${y}px`;


        sparkle.style.fontSize =
            `${10 + Math.random() * 18}px`;


        sparkle.style.color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        sparkle.style.setProperty(
            "--dx",
            `${Math.random() * 190 - 95}px`
        );


        sparkle.style.setProperty(
            "--dy",
            `${Math.random() * 190 - 95}px`
        );


        sparkle.style.animationDuration =
            `${700 + Math.random() * 450}ms`;


        document.body.appendChild(
            sparkle
        );


        sparkle.addEventListener(
            "animationend",
            () => {
                sparkle.remove();
            }
        );
    }
}


// ==========================================
// 12. SERVICE WORKER
// ==========================================

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("./service-worker.js")

                .then(() => {
                    console.log(
                        "✨ Sparkle Routine lista"
                    );
                })

                .catch(error => {
                    console.error(
                        "Error Service Worker:",
                        error
                    );
                });
        }
    );
}


// ==========================================
// 13. INICIAR
// ==========================================

renderWorkouts();
