const button = document.getElementById("analyzeBtn");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

button.addEventListener("click", async () => {

    const fileInput = document.getElementById("resume");

    if (fileInput.files.length === 0) {
        alert("Please select your resume.");
        return;
    }

    loading.innerHTML = "🤖 AI is analyzing your resume...";
    result.innerHTML = "";

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {

        const response = await fetch("http://127.0.0.1:8000/analyze-resume", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Server Error");
        }

        const data = await response.json();

        loading.innerHTML = "";

        // Save data for next page
        localStorage.setItem("resumeResult", JSON.stringify(data));

        // Go to Result Page
        window.location.href = "result.html";

    }
    catch(error){

        loading.innerHTML="";

        result.innerHTML=`
        <div class="card">
            <h2>❌ Error</h2>
            <p>${error.message}</p>
        </div>
        `;

        console.log(error);

    }

});