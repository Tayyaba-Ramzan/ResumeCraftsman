// Get references to the form and display area
var form = document.getElementById('form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
var profilePictureInput = document.getElementById('profile-picture-input');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page reload
    // Collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Read the profile picture if selected
    var profilePictureURL;
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        var file = profilePictureInput.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profilePictureURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            saveAndDisplayResume();
        };
        reader.readAsDataURL(file);
    }
    else {
        saveAndDisplayResume();
    }
    function saveAndDisplayResume() {
        // Save form data in localStorage with the username as the key
        var resumeData = {
            name: name,
            email: email,
            phone: phone,
            education: education,
            experience: experience,
            skills: skills,
            profilePictureURL: profilePictureURL
        };
        localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
        // Generate the resume content dynamically
        var resumeHTML = "\n        <h2><i class=\"fas fa-user-edit\"></i> Editable Resume</h2>\n        ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" width=\"150\" height=\"150\"/>") : '', "\n        <br>\n        <h3><i class=\"fas fa-user\"></i> Personal Information</h3>\n        <p><b><i class=\"fas fa-user-tag\"></i> Name:</b> <span contenteditable=\"true\">").concat(name, "</span></p>\n        <p><b><i class=\"fas fa-envelope\"></i> Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><b><i class=\"fas fa-phone\"></i> Phone:</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n\n        <h3><i class=\"fas fa-graduation-cap\"></i> Education</h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n\n        <h3><i class=\"fas fa-briefcase\"></i> Experience</h3>\n        <p contenteditable=\"true\">").concat(experience, "</p>\n\n        <h3><i class=\"fas fa-cogs\"></i> Skills</h3>\n        <p contenteditable=\"true\">").concat(skills, "</p>\n    ");
        // Display the generated resume
        resumeDisplayElement.innerHTML = resumeHTML;
        resumeDisplayElement.style.display = 'block'; // Show the resume section
        // Generate a shareable URL with the username only
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
        // Display the shareable link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    }
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
            // Set the profile picture if present
            if (resumeData.profilePictureURL) {
                var profilePicture = document.getElementById('profile-picture-input');
                profilePicture.style.backgroundImage = "url(".concat(resumeData.profilePictureURL, ")");
            }
        }
    }
});
