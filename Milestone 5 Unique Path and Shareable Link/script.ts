// Get references to the form and display area
const form = document.getElementById('form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
const profilePictureInput = document.getElementById('profile-picture-input') as HTMLInputElement;

// Handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // prevent page reload

    // Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;

    // Read the profile picture if selected
    let profilePictureURL: string | undefined;
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        const file = profilePictureInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePictureURL = e.target?.result as string;
            saveAndDisplayResume();
        };
        reader.readAsDataURL(file);
    } else {
        saveAndDisplayResume();
    }

    function saveAndDisplayResume() {
        // Save form data in localStorage with the username as the key
        const resumeData = {
            name,
            email,
            phone,
            education,
            experience,
            skills,
            profilePictureURL
        };
        localStorage.setItem(username, JSON.stringify(resumeData));  // Saving the data locally

        // Generate the resume content dynamically
        const resumeHTML = `
        <h2><i class="fas fa-user-edit"></i> Editable Resume</h2>
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" width="150" height="150"/>` : ''}
        <br>
        <h3><i class="fas fa-user"></i> Personal Information</h3>
        <p><b><i class="fas fa-user-tag"></i> Name:</b> <span contenteditable="true">${name}</span></p>
        <p><b><i class="fas fa-envelope"></i> Email:</b> <span contenteditable="true">${email}</span></p>
        <p><b><i class="fas fa-phone"></i> Phone:</b> <span contenteditable="true">${phone}</span></p>

        <h3><i class="fas fa-graduation-cap"></i> Education</h3>
        <p contenteditable="true">${education}</p>

        <h3><i class="fas fa-briefcase"></i> Experience</h3>
        <p contenteditable="true">${experience}</p>

        <h3><i class="fas fa-cogs"></i> Skills</h3>
        <p contenteditable="true">${skills}</p>
    `;

        // Display the generated resume
        resumeDisplayElement.innerHTML = resumeHTML;
        resumeDisplayElement.style.display = 'block'; // Show the resume section

        // Generate a shareable URL with the username only
        const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

        // Display the shareable link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    }
});

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);

        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLInputElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLInputElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLInputElement).value = resumeData.skills;

            // Set the profile picture if present
            if (resumeData.profilePictureURL) {
                const profilePicture = document.getElementById('profile-picture-input') as HTMLInputElement;
                profilePicture.style.backgroundImage = `url(${resumeData.profilePictureURL})`;
            }
        }
    }
});
