const data = JSON.parse(localStorage.getItem("resumeResult"));

if (!data) {

    alert("No Resume Analysis Found!");

    window.location.href = "index.html";

}


const score = document.getElementById("score");
const scoreText = document.getElementById("scoreText");

score.innerText = data.ats_score + "%";

if (data.ats_score >= 85) {

    scoreText.innerText = "🟢 Excellent Resume";

}
else if (data.ats_score >= 70) {

    scoreText.innerText = "🔵 Good Resume";

}
else if (data.ats_score >= 50) {

    scoreText.innerText = "🟡 Average Resume";

}
else{

    scoreText.innerText = "🔴 Needs Improvement";

}

document.getElementById("summary").innerText = data.summary;


function loadList(id, array){

    const ul = document.getElementById(id);

    ul.innerHTML = "";

    if(!array || array.length===0){

        ul.innerHTML = "<li>No Data Found</li>";

        return;

    }

    array.forEach(item=>{

        const li = document.createElement("li");

        li.innerText = item;

        ul.appendChild(li);

    });

}

loadList(

    "strengths",

    data.strengths

);

loadList(

    "weaknesses",

    data.weaknesses

);

loadList(

    "suggestions",

    data.suggestions

);

document.getElementById("strengthCount").innerText =
data.strengths.length;

document.getElementById("weaknessCount").innerText =
data.weaknesses.length;

document.getElementById("skillCount").innerText =
data.missing_skills.length;

const skills = document.getElementById("skills");

skills.innerHTML = "";

if(

    data.missing_skills

    &&

    data.missing_skills.length>0

){

    data.missing_skills.forEach(skill=>{

        const span=document.createElement("span");

        span.className="skill";

        span.innerText=skill;

        skills.appendChild(span);

    });

}

else{

    skills.innerHTML="<p>No Missing Skills 🎉</p>";

}

const cards=document.querySelectorAll(".card");

cards.forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform="translateY(30px)";

    setTimeout(()=>{

        card.style.transition=".6s";

        card.style.opacity="1";

        card.style.transform="translateY(0)";

    },index*120);

});

const chartCanvas = document.getElementById("chart");

if (chartCanvas) {

    new Chart(chartCanvas, {

        type: "bar",

        data: {

            labels: [

                "Strengths",

                "Weaknesses",

                "Missing Skills"

            ],

            datasets: [

                {

                    label: "Resume Analysis",

                    data: [

                        data.strengths.length,

                        data.weaknesses.length,

                        data.missing_skills.length

                    ],

                    backgroundColor: [

                        "#22c55e",

                        "#ef4444",

                        "#3b82f6"

                    ],

                    borderRadius: 10

                }

            ]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: "#ffffff"

                    },

                    grid: {

                        color: "#334155"

                    }

                },

                x: {

                    ticks: {

                        color: "#ffffff"

                    },

                    grid: {

                        display: false

                    }

                }

            }

        }

    });

}

const matchBtn = document.getElementById("matchBtn");

if (matchBtn) {

    matchBtn.addEventListener("click", () => {

        const jd = document
            .getElementById("jobDescription")
            .value
            .toLowerCase()
            .trim();

        if (jd === "") {

            alert("Please paste the Job Description.");

            return;

        }

        const resumeText = [

            data.summary,

            ...(data.strengths || []),

            ...(data.suggestions || []),

            ...(data.missing_skills || [])

        ].join(" ").toLowerCase();

        const words = jd
            .split(/\s+/)
            .filter(word => word.length > 2);

        let matched = 0;

        words.forEach(word => {

            if (resumeText.includes(word)) {

                matched++;

            }

        });

        let score = Math.round((matched / words.length) * 100);

        if (score > 100) score = 100;

        document.getElementById("matchResult").style.display = "block";

        document.getElementById("matchScore").innerText = score + "%";

        let message = "";

        if (score >= 90) {

            message = "🟢 Excellent Match! Your resume is highly aligned with this job.";

        }

        else if (score >= 75) {

            message = "🔵 Good Match! Add a few more keywords to improve ATS ranking.";

        }

        else if (score >= 60) {

            message = "🟡 Average Match. Tailor your resume for this specific role.";

        }

        else {

            message = "🔴 Low Match. Many important keywords are missing.";

        }

        document.getElementById("matchText").innerText = message;

    });

}

document.querySelectorAll(".sidebar a").forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

console.log("✅ AI Resume ATS Dashboard Loaded Successfully");
console.log(data);