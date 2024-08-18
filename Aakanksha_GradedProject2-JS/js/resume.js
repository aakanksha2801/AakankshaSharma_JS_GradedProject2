let applicants = [];
let filteredApplicants = [];
let currentIndex = 0;

let applicantList = document.getElementById('applicant-list');

document.addEventListener('DOMContentLoaded', function () {
  fetch('../data/data.json')
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        applicants = data;
        filteredApplicants = applicants;
        displayApplicants();
      } else {
        console.error('Data is not an array:', data);
      }
    })
    .catch((error) => {
      console.error('Error fetching the data:', error);
    });
});

function displayApplicants() {
  applicantList.innerHTML = '';

  filteredApplicants.forEach((applicant) => {
    const applicantDetail = document.createElement('div');
    applicantDetail.className = 'applicant-details';

    applicantDetail.innerHTML = `
      <h4>${applicant.basics.name}</h4>
      <p><strong>Applied For:</strong> ${applicant.basics.AppliedFor}</p>
      <p><strong>Email:</strong> ${applicant.basics.email}</p>
    `;

    applicantList.appendChild(applicantDetail);
  });
}

function search() {
  const searchValue = document.getElementById('job-search').value.toLowerCase();

  if (searchValue.trim() === '') {
    filteredApplicants = applicants;
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    displayApplicants();
    return;
  }

  filteredApplicants = applicants.filter((applicant) =>
    applicant.basics.AppliedFor.toLowerCase().includes(searchValue)
  );

  if (filteredApplicants.length === 0) {
    document.getElementById('applicant-list').innerHTML =
      '<div class="noResume"><p>No applications for this job.</p></div>';
  } else {
    displayResume();
  }
}

function displayResume() {
  applicantList.innerHTML = '';
  const applicant = filteredApplicants[currentIndex];

  const resumeTemplate = `<div class="resume">
      <div class="main-header">
        <h2>${applicant.basics.name}</h2>
        <p><b>Appiled For:</b> ${applicant.basics.AppliedFor}</p>
        <img src="../data//profile-svgrepo-com.svg" alt="defaultImage" />
      </div>
      <div class="main-body">
        <div class="left-container">
          <div class="item">
            <h3>Personal Information</h3>
            <p>${applicant.basics.phone}</p>
            <p>${applicant.basics.email}</p>
            <p>${applicant.basics.profiles.url}</p>
          </div>
          <div class="item">
            <h3>Techincal Skills</h3>
            ${applicant.skills.keywords
              .map((skill) => `<p>${skill}</p>`)
              .join('')}
          </div>
          <div class="item">
            <h3>Hobbies</h3>
            ${applicant.interests.hobbies
              .map((skill) => `<p>${skill}</p>`)
              .join('')}
          </div>
        </div>
        <div class="right-container">
          <div class="item">
            <h3>Work Experience in previous company</h3>
            <p><b>Company Name:</b> ${applicant.work.CompanyName}</p>
            <p><b>Position:</b> ${applicant.work.Position}</p>
            <p><b>Start Date:</b> ${applicant.work.StartDate}</p>
            <p><b>End Date:</b> ${applicant.work.EndDate}</p>
            <p><b>Summary:</b> ${applicant.work.Summary}</p>
          </div>
          <div class="item">
            <h3>Projects</h3>
            <p><b>${applicant.projects.name}:</b> ${
    applicant.projects.description
  }</p>
          </div>
          <div class="item">
            <h3>Education</h3>
            <ul>
              <li><b>UG:</b> ${applicant.education.UG.institute}, ${
    applicant.education.UG.course
  }, ${applicant.education.UG.StartDate}, ${applicant.education.UG.EndDate}, ${
    applicant.education.UG.cgpa
  }</li>
  <li><b>PU:</b> ${applicant.education.SeniorSecondary.institute}, ${
    applicant.education.SeniorSecondary.cgpa
  }</li>
  <li><b>PU:</b> ${applicant.education.HighSchool.institute}, ${
    applicant.education.HighSchool.cgpa
  }</li>
            </ul>
          </div>
          <div class="item">
            <h3>Internship</h3>
            <ul>
                <li><b>Company Name:</b> ${
                  applicant.Internship.CompanyName
                }}</li>
                <li><b>Position:</b> ${applicant.Internship.Position}}</li>
                <li><b>Company Name:</b> ${
                  applicant.Internship.CompanyName
                }}</li>
                <li><b>Start Date:</b> ${applicant.Internship.StartDate}}</li>
                <li><b>End Date:</b> ${applicant.Internship.EndDate}}</li>
                <li><b>Summary:</b> ${applicant.Internship.Summary}}</li>
            </ul>
          </div>
          <div class="item">
            <h3>Achievements</h3>
            <ul>
             ${applicant.achievements.Summary.map(
               (ach) => `<li>${ach}</li>`
             ).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>`;
  applicantList.innerHTML = resumeTemplate;

  toggleButtons();
}

function nextResume() {
  if (currentIndex < filteredApplicants.length - 1) {
    currentIndex++;
    displayResume();
  }
}

function prevResume() {
  if (currentIndex > 0) {
    currentIndex--;
    displayResume();
  }
}

function toggleButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  prevBtn.style.display = 'block';
  nextBtn.style.display = 'block';

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === filteredApplicants.length - 1;
}
