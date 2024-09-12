var toggleButton = document.getElementById('toggle-skills');
var skillsSection = document.getElementById('skills');
toggleButton.addEventListener('click', function () {
    if (skillsSection.style.display === 'none') {
        skillsSection.style.display = 'block';
        toggleButton.textContent = 'Hide Skills Section';
    }
    else {
        skillsSection.style.display = 'none';
        toggleButton.textContent = 'Show Skills Section';
    }
});
