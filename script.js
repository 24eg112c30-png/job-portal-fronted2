const API_URL = "http://localhost:8082/api/jobs";

async function loadJobs() {
    const jobList = document.getElementById("job-list");

    if (!jobList) {
        console.error("job-list element not found in index.html");
        return;
    }

    jobList.innerHTML = "<p>Loading jobs...</p>";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load jobs: " + response.status);
        }

        const jobs = await response.json();

        jobList.innerHTML = "";

        if (!Array.isArray(jobs) || jobs.length === 0) {
            jobList.innerHTML = "<p>No jobs available.</p>";
            return;
        }

        jobs.forEach(function(job) {
            const jobListData = jobs.map(job => ({
    title: typeof job === "string" ? job : job.title,
    company: typeof job === "string" ? "Job Portal" : (job.company || "Not specified")
}));
            const card = document.createElement("div");
            card.className = "job-card";

            const title = document.createElement("h3");
            title.textContent = job.title || "Job Opening";

            const company = document.createElement("p");
            company.textContent = "Company: " + (job.company || "Not specified");

            card.appendChild(title);
            card.appendChild(company);
            jobList.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading jobs:", error);
        jobList.innerHTML =
            "<p>Could not load jobs. Please check the backend.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadJobs);