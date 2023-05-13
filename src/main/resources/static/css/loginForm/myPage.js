function showSection(sectionId) {
	var sections = document.querySelectorAll('section');
	for (var i = 0; i < sections.length; i++) {
		sections[i].classList.add('hidden');
	}

	var section = document.getElementById(sectionId);
	section.classList.remove('hidden');
}