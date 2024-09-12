var form = document.getElementById("form");
var resumeDisplayElement = document.getElementById("resume-display");
var profilePictureInput = document.getElementById("profile-picture-input");
// Function to generate resume HTML
var generateResumeHTML = function (name, email, phone, age, education, skills, workExperience, profilePictureURL) {
    // Function to format multiple lines
    var formatMultiLine = function (text) {
        return text.trim().split(/\r?\n/).map(function (line) { return "<p>".concat(line, "</p>"); }).join('');
    };
    return "\n        <h2><b>Editable Resume</b></h2>\n        ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" width=\"150\" height=\"150\"/>") : '', "\n        <h3><i class=\"fas fa-user\"></i> Personal Information</h3>\n        <p><b><i class=\"fas fa-user\"></i> Name:</b><span contenteditable=\"true\"> ").concat(name, "</span></p>\n        <p><b><i class=\"fas fa-envelope\"></i> Email:</b><span contenteditable=\"true\"> ").concat(email, "</span></span></p>\n        <p><b><i class=\"fas fa-phone\"></i> Phone:</b><span contenteditable=\"true\"> ").concat(phone, "</span></p>\n        <p><b><i class=\"fas fa-calendar-alt\"></i> Age:</b><span contenteditable=\"true\"> ").concat(age, "</span></p>\n        \n        <h3><i class=\"fas fa-graduation-cap\"></i> Education</h3>\n        <span contenteditable=\"true\">").concat(formatMultiLine(education), "</span>\n        \n        <h3><i class=\"fas fa-cogs\"></i> Skills</h3>\n        <span contenteditable=\"true\">").concat(formatMultiLine(skills), "</span>\n        \n        <h3><i class=\"fas fa-briefcase\"></i> Work Experience</h3>\n        <span contenteditable=\"true\">").concat(formatMultiLine(workExperience), "</span>\n    ");
};
// Handle Form Submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload
    // Collect input values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var age = document.getElementById("age").value;
    var education = document.getElementById("education").value;
    var skills = document.getElementById("skills").value;
    var workExperience = document.getElementById("work-experience").value;
    // Check if a profile picture is selected
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        var file = profilePictureInput.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var profilePictureURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            // Generate and display the resume
            resumeDisplayElement.innerHTML = generateResumeHTML(name, email, phone, age, education, skills, workExperience, profilePictureURL);
            resumeDisplayElement.style.display = "block"; // Show the resume display section
        };
        reader.readAsDataURL(file); // Read the image file as a data URL
    }
    else {
        // Generate and display the resume without a profile picture
        resumeDisplayElement.innerHTML = generateResumeHTML(name, email, phone, age, education, skills, workExperience);
        resumeDisplayElement.style.display = "block"; // Show the resume display section
    }
});
