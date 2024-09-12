const form = document.getElementById("form") as HTMLFormElement;
const resumeDisplayElement = document.getElementById("resume-display") as HTMLDivElement;
const profilePictureInput = document.getElementById("profile-picture-input") as HTMLInputElement;

// Function to generate resume HTML
const generateResumeHTML = (
    name: string,
    email: string,
    phone: string,
    age: string,
    education: string,
    skills: string,
    workExperience: string,
    profilePictureURL?: string
): string => {
    // Function to format multiple lines
    const formatMultiLine = (text: string): string => {
        return text.trim().split(/\r?\n/).map(line => `<p>${line}</p>`).join('');
    };

    return `
        <h2><b>Editable Resume</b></h2>
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" width="150" height="150"/>` : ''}
        <h3><i class="fas fa-user"></i> Personal Information</h3>
        <p><b><i class="fas fa-user"></i> Name:</b><span contenteditable="true"> ${name}</span></p>
        <p><b><i class="fas fa-envelope"></i> Email:</b><span contenteditable="true"> ${email}</span></span></p>
        <p><b><i class="fas fa-phone"></i> Phone:</b><span contenteditable="true"> ${phone}</span></p>
        <p><b><i class="fas fa-calendar-alt"></i> Age:</b><span contenteditable="true"> ${age}</span></p>
        
        <h3><i class="fas fa-graduation-cap"></i> Education</h3>
        <span contenteditable="true">${formatMultiLine(education)}</span>
        
        <h3><i class="fas fa-cogs"></i> Skills</h3>
        <span contenteditable="true">${formatMultiLine(skills)}</span>
        
        <h3><i class="fas fa-briefcase"></i> Work Experience</h3>
        <span contenteditable="true">${formatMultiLine(workExperience)}</span>
    `;
};

// Handle Form Submission
form.addEventListener("submit", (event: Event) => {
    event.preventDefault(); // Prevent page reload

    // Collect input values
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const age = (document.getElementById("age") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const skills = (document.getElementById("skills") as HTMLInputElement).value;
    const workExperience = (document.getElementById("work-experience") as HTMLInputElement).value;

    // Check if a profile picture is selected
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        const file = profilePictureInput.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const profilePictureURL = e.target?.result as string;

            // Generate and display the resume
            resumeDisplayElement.innerHTML = generateResumeHTML(
                name,
                email,
                phone,
                age,
                education,
                skills,
                workExperience,
                profilePictureURL
            );
            resumeDisplayElement.style.display = "block"; // Show the resume display section
        };

        reader.readAsDataURL(file); // Read the image file as a data URL
    } else {
        // Generate and display the resume without a profile picture
        resumeDisplayElement.innerHTML = generateResumeHTML(
            name,
            email,
            phone,
            age,
            education,
            skills,
            workExperience
        );
        resumeDisplayElement.style.display = "block"; // Show the resume display section
    }
});
