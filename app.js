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

        video:
            "https://youtu.be/FdCP27MtuNU"
    },


    {
        id: 2,
        day: "Jueves",
        title: "Brazos",
        duration: "12 min",

        video:
            "https://youtu.be/5dgwIC71Dnc"
    },


    {
        id: 3,
        day: "Viernes",
        title: "Glúteos",
        duration: "29 min",

        video:
            "https://youtu.be/kl5AhFQtfvg"
    },


    {
        id: 4,
        day: "Domingo",
        title: "Full Body + abdomen",
        duration: "21 min",

        video:
            "https://youtu.be/s-lfJuUIxzY"
    }

];



// ==========================================
// 2. DETECTAR DÍA ACTUAL
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


const today =
    new Date();


const todayName =
    days[today.getDay()];



// ==========================================
// 3. ENTRENAMIENTOS COMPLETADOS
// ==========================================

let completedWorkouts =

    JSON.parse(

        localStorage.getItem(
            "completedWorkouts"
        )

    ) || [];



// ==========================================
// 4. ELEMENTOS DEL HTML
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


const resetButton =

    document.getElementById(
        "reset-week"
    );



// ==========================================
// 5. CREAR TARJETAS
// ==========================================

function renderWorkouts() {

    container.innerHTML = "";


    workouts.forEach(workout => {


        const completed =

            completedWorkouts.includes(
                workout.id
            );


        const isToday =

            workout.day === todayName;



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
                            : ''
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
// 6. COMPLETAR / DESMARCAR
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


        completedWorkouts.push(
            id
        );

    }



    localStorage.setItem(

        "completedWorkouts",

        JSON.stringify(
            completedWorkouts
        )

    );



    renderWorkouts();

}



// ==========================================
// 7. PROGRESO SEMANAL
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



    if (progressMessage) {


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



            if (confirmation) {


                completedWorkouts = [];


                localStorage.removeItem(

                    "completedWorkouts"
                );


                renderWorkouts();

            }

        }

    );

}



// ==========================================
// ✦ 9. BRILLITOS + SONIDO ✦
// ==========================================


// Audio mágico principal

const sparkleSound =

    new Audio(
        "./sounds/sparkle.mp3"
    );


// Cargarlo anticipadamente

sparkleSound.preload =
    "auto";


// Volumen:
// 0 = nada
// 1 = máximo

sparkleSound.volume =
    0.30;



// Todas las imágenes que tengan
// la clase sparkle-image

const sparkleImages =

    document.querySelectorAll(
        ".sparkle-image"
    );



sparkleImages.forEach(image => {


    image.addEventListener(

        "click",

        event => {


            // ==========================
            // SONIDO
            // ==========================

            const sound =

                sparkleSound.cloneNode();


            sound.volume =
                0.30;


            sound.play().catch(() => {

                console.log(
                    "El navegador bloqueó el sonido."
                );

            });



            // ==========================
            // BRILLITOS
            // ==========================

            createSparkleBurst(
                event
            );



            // ==========================
            // MINI REBOTE
            // ==========================

            image.classList.remove(
                "sparkle-pop"
            );


            // Forzar reinicio
            // de la animación

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
// 10. CREAR BRILLITOS
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

            `${
                10 +
                Math.random() * 18
            }px`;



        sparkle.style.color =

            colors[

                Math.floor(

                    Math.random() *
                    colors.length

                )

            ];



        sparkle.style.setProperty(

            "--dx",

            `${
                Math.random() * 190 - 95
            }px`

        );



        sparkle.style.setProperty(

            "--dy",

            `${
                Math.random() * 190 - 95
            }px`

        );



        sparkle.style.animationDuration =

            `${
                700 +
                Math.random() * 450
            }ms`;



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
// 11. SERVICE WORKER
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

                    console.log(
                        "Error en Service Worker:",
                        error
                    );

                });

        }

    );

}



// ==========================================
// 12. INICIAR APLICACIÓN
// ==========================================

renderWorkouts();===
// 11. INICIAR
// ==========================================

renderWorkouts();
