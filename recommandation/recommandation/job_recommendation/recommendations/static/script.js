// // If You want To add any script Then You can Add script here
// document.getElementById("profileForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     // Get form values
//     const name = document.getElementById("name").value;
//     const skills = document.getElementById("skills").value.split(",").map(skill => skill.trim());
//     const experience_level = document.getElementById("experience_level").value;
//     const desired_roles = document.getElementById("desired_roles").value.split(",").map(role => role.trim());
//     const locations = document.getElementById("locations").value.split(",").map(location => location.trim());
//     const job_type = document.getElementById("job_type").value;

//     // Input validation
//     if (!name || !skills.length || !experience_level || !desired_roles.length || !locations.length || !job_type) {
//         alert("Please fill out all fields before submitting.");
//         return;
//     }

//     // Prepare the data
//     const userProfileData = {
//         name,
//         skills,
//         experience_level,
//         desired_roles,
//         locations,
//         job_type,
//     };

//     // Show loading indicator
//     showLoading();

//     // Send POST request to the API
//     fetch("http://127.0.0.1:8000/api/user/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userProfileData),
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("User Profile Created:", data);
//         alert("User Profile Created Successfully!");
//         hideLoading();
//     })
//     .catch(error => {
//         console.error("Error creating user profile:", error);
//         alert("Error creating user profile.");
//         hideLoading();
//     });
// });

// // Fetch job postings
// function fetchJobPostings() {
//     showLoading(); // Show loading before fetching

//     fetch("http://127.0.0.1:8000/api/jobs/")
//         .then(response => response.json())
//         .then(data => {
//             const jobList = document.getElementById("jobList");
//             jobList.innerHTML = ""; // Clear existing listings
//             data.forEach(job => {
//                 const jobItem = document.createElement("div");
//                 jobItem.innerHTML = `
//                     <h3>${job.title}</h3>
//                     <p>${job.description}</p>
//                     <p><strong>Requirements:</strong> ${job.requirements.join(", ")}</p>
//                     <p><strong>Locations:</strong> ${job.locations.join(", ")}</p>
//                     <p><strong>Job Type:</strong> ${job.job_type}</p>
//                 `;
//                 jobList.appendChild(jobItem);
//             });
//             hideLoading(); // Hide loading after fetching
//         })
//         .catch(error => {
//             console.error("Error fetching job postings:", error);
//             hideLoading(); // Hide loading even on error
//         });
// }

// // Call the fetchJobPostings function when the page loads
// window.onload = fetchJobPostings;

// // Loading functions
// function showLoading() {
//     const loading = document.createElement("div");
//     loading.innerText = "Loading...";
//     loading.id = "loadingIndicator";
//     document.body.appendChild(loading);
// }

// function hideLoading() {
//     const loading = document.getElementById("loadingIndicator");
//     if (loading) {
//         loading.remove();
//     }
// }
// Submit user profile and fetch personalized job recommendations
document.getElementById("profileForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const skills = document.getElementById("skills").value.split(",").map(skill => skill.trim());
    const experience_level = document.getElementById("experience_level").value;
    const desired_roles = document.getElementById("desired_roles").value.split(",").map(role => role.trim());
    const locations = document.getElementById("locations").value.split(",").map(location => location.trim());
    const job_type = document.getElementById("job_type").value;

    // Prepare the data
    const userProfileData = {
        name,
        skills,
        experience_level,
        desired_roles,
        locations,
        job_type,
    };

    // Send POST request to the API to create the user profile
    fetch("http://127.0.0.1:8000/api/user/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfileData),
    })
    .then(response => response.json())
    .then(data => {
        console.log("User Profile Created:", data);
        alert("User Profile Created Successfully!");
        
        // Fetch personalized job recommendations using the created user's ID
        fetchJobPostings(data.id); // Assuming the response contains the user's ID
    })
    .catch(error => {
        console.error("Error creating user profile:", error);
        alert("Error creating user profile.");
    });
});

// Fetch job postings personalized for the user
function fetchJobPostings(userId) {
    fetch(`http://127.0.0.1:8000/api/jobs/?user_id=${userId}`)
        .then(response => response.json())
        .then(data => {
            const jobList = document.getElementById("jobList");
            jobList.innerHTML = ""; // Clear existing listings
            data.forEach(job => {
                const jobItem = document.createElement("div");
                jobItem.innerHTML = `
                    <h3>${job.title}</h3>
                    <p>${job.description}</p>
                    <p><strong>Requirements:</strong> ${job.requirements.join(", ")}</p>
                    <p><strong>Locations:</strong> ${job.locations.join(", ")}</p>
                    <p><strong>Job Type:</strong> ${job.job_type}</p>
                `;
                jobList.appendChild(jobItem);
            });
        })
        .catch(error => {
            console.error("Error fetching job postings:", error);
        });
}
