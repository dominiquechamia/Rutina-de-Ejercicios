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

const todayName =
    days[today.getDay()];


// ==========================================
// 3. CALCULAR SEMANA ACTUAL
// La semana comienza el lunes.
// Guardamos la fecha del lunes:
// ejemplo: 2026-09-21
// ==========================================

function getMonday(date) {

    const result =
        new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );

    const day =
        result.getDay();

    const difference =
        day === 0
            ? -6
            : 1 - day;

    result.setDate(
        result.getDate() + difference
    );

    result.setHours(0, 0, 0, 0);

    return result;
}


function formatDateKey(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


const currentMonday =
    getMonday(today);

const currentWeekKey =
    formatDateKey(currentMonday);


// ==========================================
// 4. DATOS GUARDADOS
// ==========================================

let completedWorkouts = [];

let completedWeeks = [];


try {

    completedWorkouts =
        JSON.parse(
            localStorage.getItem(
                "completedWorkouts"
            )
        ) || [];


    completedWeeks =
        JSON.parse(
            localStorage.getItem(
                "completedWeeks"
            )
        ) || [];

}
catch (error) {

    completedWorkouts = [];

    completedWeeks = [];
}


// ==========================================
// 5. REINICIO AUTOMÁTICO SEMANAL
// ==========================================

const storedWeekKey =
    localStorage.getItem(
        "activeWeekKey"
    );


if (!storedWeekKey) {

    // Primera vez que usamos
    // el sistema semanal.

    localStorage.setItem(
        "activeWeekKey",
        currentWeekKey
    );

}
else if (
    storedWeekKey !==
    currentWeekKey
) {

    // Entramos a una nueva semana.
    // Se limpian solamente los checks.

    completedWorkouts = [];


    localStorage.setItem(
        "completedWorkouts",
        JSON.stringify(
            completedWorkouts
        )
    );


    localStorage.setItem(
        "activeWeekKey",
        currentWeekKey
    );

}


// ==========================================
// 6. ELEMENTOS DEL HTML
// ==========================================

const container =
    document.getElementById(
        "workout-container"
    );

const progressNumber =
    document.getElementById(
        "progress-number"
    );

const progressBar =
    document.getElementById(
        "progress"
    );

const progressMessage =
    document.getElementById(
        "progress-message"
    );

const stars =
    document.getElementById(
        "stars"
    );

const streak =
    document.getElementById(
        "streak"
    );

const resetButton =
    document.getElementById(
        "reset-week"
    );


// ==========================================
// 7. CREAR TARJETAS
// ==========================================

function renderWorkouts() {

    if (!container) {

        console.error(
            "No existe #workout-container"
        );

        return;
    }


    container.innerHTML = "";


    workouts.forEach(workout => {

        const completed =
            completedWorkouts.includes(
                workout.id
            );


        const isToday =
            workout.day ===
            todayName;


        const card =
            document.createElement(
                "article"
            );


        card.classList.add(
            "workout-card"
        );


        if (completed) {

            card.classList.add(
                "completed"
            );
        }


        if (isToday) {

            card.classList.add(
                "today"
            );
        }


        card.innerHTML = `

            <div class="workout-top">

                <div class="workout-day">

                    ${
                        isToday
                            ? '<span class="today-label">✦ HOY</span>'
                            : ""
                    }

                    <span class="day">
                        ${workout.day}
                    </span>

                </div>


                <span class="card-star">

                    ${
                        completed
                            ? "⭐"
                            : "✦"
                    }

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


        container.appendChild(
            card
        );
    });


    updateProgress();
}


// ==========================================
// 8. COMPLETAR / DESMARCAR
// ==========================================

function toggleWorkout(id) {

    if (
        completedWorkouts.includes(id)
    ) {

        completedWorkouts =
            completedWorkouts.filter(
                workoutId =>
                    workoutId !== id
            );

    }
    else {

        completedWorkouts.push(id);
    }


    localStorage.setItem(
        "completedWorkouts",
        JSON.stringify(
            completedWorkouts
        )
    );


    updateCompletedWeeks();

    renderWorkouts();
}


window.toggleWorkout =
    toggleWorkout;


// ==========================================
// 9. REGISTRAR SEMANAS COMPLETADAS
// ==========================================

function updateCompletedWeeks() {

    const weekIsComplete =
        completedWorkouts.length ===
        workouts.length;


    const alreadyRegistered =
        completedWeeks.includes(
            currentWeekKey
        );


    // Si completaste las 4 rutinas:
    if (
        weekIsComplete &&
        !alreadyRegistered
    ) {

        completedWeeks.push(
            currentWeekKey
        );
    }


    // Si habías completado la semana
    // pero desmarcas un entrenamiento,
    // quitamos esta semana del historial.
    if (
        !weekIsComplete &&
        alreadyRegistered
    ) {

        completedWeeks =
            completedWeeks.filter(
                week =>
                    week !==
                    currentWeekKey
            );
    }


    // Evitar duplicados.
    completedWeeks =
        [...new Set(completedWeeks)];


    localStorage.setItem(
        "completedWeeks",
        JSON.stringify(
            completedWeeks
        )
    );
}


// ==========================================
// 10. CALCULAR RACHA
// ==========================================

function calculateStreak() {

    if (
        completedWeeks.length === 0
    ) {

        return 0;
    }


    let streakCount = 0;


    /*
       Si esta semana ya está completa,
       comenzamos a contar desde ella.

       Si todavía no está completa,
       empezamos desde la semana pasada.
    */

    let weekToCheck =
        new Date(currentMonday);


    if (
        !completedWeeks.includes(
            currentWeekKey
        )
    ) {

        weekToCheck.setDate(
            weekToCheck.getDate() - 7
        );
    }


    while (true) {

        const weekKey =
            formatDateKey(
                weekToCheck
            );


        if (
            completedWeeks.includes(
                weekKey
            )
        ) {

            streakCount++;


            weekToCheck.setDate(
                weekToCheck.getDate() - 7
            );

        }
        else {

            break;
        }

    }


    return streakCount;
}


// ==========================================
// 11. ACTUALIZAR PROGRESO
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

        stars.textContent =
            completed;
    }


    if (streak) {

        streak.textContent =
            calculateStreak();
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
// 12. REINICIAR MANUALMENTE
// ==========================================

if (resetButton) {

    resetButton.addEventListener(
        "click",
        () => {

            const confirmation =
                confirm(
                    "¿Quieres reiniciar los entrenamientos de esta semana?"
                );


            if (!confirmation) {

                return;
            }


            completedWorkouts = [];


            localStorage.setItem(
                "completedWorkouts",
                JSON.stringify(
                    completedWorkouts
                )
            );


            /*
               Si esta semana estaba registrada
               como completa, la quitamos.
            */

            completedWeeks =
                completedWeeks.filter(
                    week =>
                        week !==
                        currentWeekKey
                );


            localStorage.setItem(
                "completedWeeks",
                JSON.stringify(
                    completedWeeks
                )
            );


            renderWorkouts();
        }
    );
}


// ==========================================
// 13. SONIDO MÁGICO
// ==========================================

const sparkleSound =
    new Audio(
        "./sounds/sparkle.mp3"
    );


sparkleSound.preload =
    "auto";


sparkleSound.volume =
    0.25;


// ==========================================
// 14. BRILLITOS EN TWILIGHT
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


            sound.volume =
                0.25;


            sound.play().catch(
                () => {

                    console.log(
                        "No se pudo reproducir sparkle.mp3"
                    );

                }
            );


            // BRILLITOS

            createSparkleBurst(
                event
            );


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
// 15. CREAR BRILLITOS
// ==========================================

function createSparkleBurst(event) {

    const sparkleCount =
        18;

    const x =
        event.clientX;

    const y =
        event.clientY;


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
            document.createElement(
                "span"
            );


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
// 16. SERVICE WORKER
// ==========================================

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator
                .serviceWorker
                .register(
                    "./service-worker.js"
                )

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
// 17. INICIAR
// ==========================================

// Por si ya tenías 4/4 antes
// de instalar esta actualización.

updateCompletedWeeks();

renderWorkouts();
