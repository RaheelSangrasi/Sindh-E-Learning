// Application State
let currentPage = 'grade';
let selectedGrade = 0;
let selectedSubject = '';

// Grade to Subject Mapping
const gradeSubjects = {
    1: ['English', 'Sindhi', 'Maths'],
    2: ['English', 'Sindhi', 'Maths'],
    3: ['English', 'Sindhi', 'Maths'],
    4: ['English', 'Sindhi', 'Maths'],
    5: ['English', 'Sindhi', 'Maths'],
    6: ['English', 'Maths', 'Science', 'Sindhi'],
    7: ['English', 'Maths', 'Science', 'Sindhi'],
    8: ['English', 'Maths', 'Science', 'Sindhi'],
};

// Resource Data (Only partial; full data should be here)
const resourceData = {
    1: {
        English: {
            name: 'English',
            books: [
                { title: 'English Class 1 Textbook', pdfUrl: '#' },
                { title: 'English Workbook Class 1', pdfUrl: '#' }
            ],
            videos: [
                { title: 'ABC Learning for Class 1', youtubeId: 'ccEpTTZW34g' },
                { title: 'Basic English Words', youtubeId: 'krpkQhdkyKw' }
            ]
        },
        Sindhi: {
            name: 'Sindhi',
            books: [
                { title: 'Sindhi Class 1 Book', pdfUrl: '#' },
                { title: 'Sindhi Alphabet Book', pdfUrl: '#' }
            ],
            videos: [
                { title: 'Sindhi Alphabets', youtubeId: 'ABi15hJSLOM' },
                { title: 'Basic Sindhi Words', youtubeId: '5JiJN0A4pVA' }
            ]
        },
        Maths: {
            name: 'Maths',
            books: [
                { title: 'Mathematics Class 1', pdfUrl: '#' },
                { title: 'Number Recognition Book', pdfUrl: '#' }
            ],
            videos: [
                { title: 'Counting 1 to 10', youtubeId: 'DR-cfDsHCGA' },
                { title: 'Counting 1 to 100', youtubeId: 'bGetqbqDVaA' }
            ]
        }
    }
    // Add full data for classes 2 to 8 here (same structure)
};

// Auto-generate resource data for all classes/subjects if missing
function generateResourceData() {
    const data = { ...resourceData };
    for (let grade = 1; grade <= 8; grade++) {
        if (!data[grade]) {
            data[grade] = {};
            gradeSubjects[grade].forEach(subject => {
                data[grade][subject] = {
                    name: subject,
                    books: [
                        { title: `${subject} Class ${grade} Textbook`, pdfUrl: '#' },
                        { title: `${subject} Workbook Class ${grade}`, pdfUrl: '#' }
                    ],
                    videos: [
                        { title: `${subject} Basics Class ${grade}`, youtubeId: 'dQw4w9WgXcQ' },
                        { title: `${subject} Practice Class ${grade}`, youtubeId: 'dQw4w9WgXcQ' }
                    ]
                };
            });
        }
    }
    return data;
}

const allResourceData = generateResourceData();

// Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId.replace('-page', '');
}

function selectGrade(grade) {
    selectedGrade = grade;
    showPage('subject-page');
    renderSubjectPage();
}

function selectSubject(subject) {
    selectedSubject = subject;
    showPage('resources-page');
    renderResourcesPage();
}

function goBack() {
    if (currentPage === 'subject') {
        showPage('grade-page');
    } else if (currentPage === 'resources') {
        showPage('subject-page');
        renderSubjectPage();
    }
}

// Render Functions
function renderGradePage() {
    const gradeGrid = document.getElementById('grade-grid');
    gradeGrid.innerHTML = '';

    for (let grade = 1; grade <= 8; grade++) {
        const subjects = gradeSubjects[grade];
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => selectGrade(grade);

        card.innerHTML = `
            <div class="card-header">
                <div class="grade-number">
                    <span>${grade}</span>
                </div>
                <h2 class="card-title">Class ${grade}</h2>
            </div>
            <div class="card-content">
                <p class="subject-count">📚 ${subjects.length} Subject${subjects.length > 1 ? 's' : ''} 📚</p>
                <div class="subject-tags">
                    ${subjects.map(subject => `<span class="subject-tag">${subject}</span>`).join('')}
                </div>
            </div>
        `;
        gradeGrid.appendChild(card);
    }
}

function renderSubjectPage() {
    const subjectTitle = document.getElementById('subject-title');
    const subjectGrid = document.getElementById('subject-grid');

    subjectTitle.textContent = `📖 Class ${selectedGrade} Subjects 📖`;
    subjectGrid.innerHTML = '';

    const subjects = gradeSubjects[selectedGrade];
    subjects.forEach(subject => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.onclick = () => selectSubject(subject);

        const iconClass =
            subject === 'English' ? 'english-icon' :
            subject === 'Sindhi' ? 'sindhi-icon' :
            subject === 'Maths' ? 'maths-icon' : 'science-icon';

        const icon =
            subject === 'English' ? '📝' :
            subject === 'Sindhi' ? '📚' :
            subject === 'Maths' ? '🔢' : '🔬';

        card.innerHTML = `
            <div class="subject-header">
                <div class="subject-icon ${iconClass}">
                    <span>${icon}</span>
                </div>
                <h2 class="subject-name">${subject}</h2>
            </div>
            <div class="subject-content">
                <p class="subject-description">📖 Books, 🎥 Videos & 🎮 Activities</p>
                <div class="resource-badges">
                    <div class="resource-badge books-badge">
                        <span class="badge-dot yellow-dot"></span>
                        <span>📚 2 Books</span>
                    </div>
                    <div class="resource-badge videos-badge">
                        <span class="badge-dot green-dot"></span>
                        <span>🎥 Videos</span>
                    </div>
                </div>
            </div>
        `;

        subjectGrid.appendChild(card);
    });
}

function renderResourcesPage() {
    const resourcesTitle = document.getElementById('resources-title');
    const booksContent = document.getElementById('books-content');
    const videosContent = document.getElementById('videos-content');

    resourcesTitle.textContent = `Class ${selectedGrade} - ${selectedSubject}`;
    const currentResources = allResourceData[selectedGrade]?.[selectedSubject];

    // Books
    booksContent.innerHTML = '';
    currentResources?.books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'resource-item';
        bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <div class="btn-group">
                <button class="btn btn-primary">[BOOK] Read Online</button>
                <button class="btn btn-secondary">[DOWNLOAD] Download PDF</button>
            </div>
        `;
        booksContent.appendChild(bookItem);
    });

    // Mobile App Info Card
    const mobileCard = document.createElement('div');
    mobileCard.style.cssText = 'background: linear-gradient(to right, #3b82f6, #8b5cf6); padding: 1rem; border-radius: 0.5rem; color: white; margin-top: 1rem;';
    mobileCard.innerHTML = `
        <h4 style="font-weight: 600; margin-bottom: 0.5rem;">[MOBILE] Mobile App Available</h4>
        <p style="font-size: 0.875rem; opacity: 0.9;">Download our mobile app for offline reading</p>
    `;
    booksContent.appendChild(mobileCard);

    // Videos
    videosContent.innerHTML = '';
    currentResources?.videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'resource-item';
        videoItem.innerHTML = `
            <div class="video-item">
                <div class="video-thumbnail" onclick="playVideo('${video.youtubeId}')">
                    [PLAY]
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p class="video-meta">Interactive learning video • Class ${selectedGrade}</p>
                    <button class="btn btn-primary" onclick="playVideo('${video.youtubeId}')">
                        ▶️ Watch Video
                    </button>
                </div>
            </div>
        `;
        videosContent.appendChild(videoItem);
    });
}

// Video Modal
function playVideo(youtubeId) {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-iframe');
    iframe.src = `https://www.youtube.com/embed/${youtubeId}`;
    modal.classList.remove('hidden');
}

function closeVideo() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-iframe');
    iframe.src = '';
    modal.classList.add('hidden');
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderGradePage();
});
