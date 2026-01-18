// Mock API Data
const mockAPI = {
    trafficData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        direct: [1200, 1900, 1500, 2200, 1800, 2500, 3000],
        search: [800, 1100, 900, 1400, 1200, 1600, 2000],
        social: [400, 600, 500, 800, 700, 900, 1200],
        referral: [300, 450, 350, 600, 500, 700, 900]
    },
    pageViews: {
        home: 2450,
        about: 890,
        blog: 1560,
        contact: 670,
        products: 1230
    },
    topPages: [
        { page: '/home', views: 2450, bounce: '38%', time: '2m 45s' },
        { page: '/blog', views: 1560, bounce: '45%', time: '3m 12s' },
        { page: '/products', views: 1230, bounce: '52%', time: '1m 58s' },
        { page: 'about', views: 890, bounce: '33%', time: '4m 10s' },
        { page: '/contact', views: 670, bounce: '61%', time: '1m 30s' }
    ]
};

// Charts initialization
let trafficChart, pageViewsChart;

function initCharts() {
    // Traffic Sources Chart
    const ctx1 = document.getElementById('trafficChart').getContext('2d');
    trafficChart = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Direct', 'Search', 'Social', 'Referral'],
            datasets: [{
                data: [3000, 2000, 1200, 900],
                backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });

    // Page Views Chart
    const ctx2 = document.getElementById('pageViewsChart').getContext('2d');
    pageViewsChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Home', 'Blog', 'Products', 'About', 'Contact'],
            datasets: [{
                label: 'Views',
                data: [2450, 1560, 1230, 890, 670],
                backgroundColor: '#0E4BF1',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } }
        }
    });
}

// Real-time data updates
function updateData() {
    const visits = Math.floor(Math.random() * 500) + 125000;
    const visitors = Math.floor(Math.random() * 300) + 89000;

    document.getElementById('totalVisits').textContent = visits.toLocaleString();
    document.getElementById('uniqueVisitors').textContent = visitors.toLocaleString();
    document.getElementById('bounceRate').textContent = (Math.random() * 20 + 35).toFixed(1) + '%';
    document.getElementById('conversionRate').textContent = (Math.random() * 2 + 2.5).toFixed(1) + '%';
}

// Populate table
function updateTable() {
    const tbody = document.querySelector('#topPagesTable tbody');
    tbody.innerHTML = '';
    mockAPI.topPages.forEach(row => {
        tbody.innerHTML += `
            <tr>
                <td>${row.page}</td>
                <td>${row.views.toLocaleString()}</td>
                <td>${row.bounce}</td>
                <td>${row.time}</td>
            </tr>
        `;
    });
}

// Navigation & UI Controls
const body = document.querySelector("body"),
    sidebar = body.querySelector("nav"),
    sidebarToggle = body.querySelector(".sidebar-toggle"),
    modeToggle = body.querySelector(".mode-toggle"),
    navLinks = document.querySelectorAll(".nav-links a"),
    dateFilter = document.getElementById('dateFilter');

// Dark mode & sidebar persistence
let getMode = localStorage.getItem("mode");
let getStatus = localStorage.getItem("status");

if (getMode === "dark") body.classList.add("dark");
if (getStatus === "close") sidebar.classList.add("close");

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("mode", body.classList.contains("dark") ? "dark" : "light");
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    localStorage.setItem("status", sidebar.classList.contains("close") ? "close" : "open");
});

// Navigation
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
        document.getElementById(targetId)?.classList.remove('hidden');
    });
});

// Date filter
dateFilter.addEventListener('change', (e) => {
    console.log('Filter changed to:', e.target.value);
    // Update charts based on filter
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    updateTable();

    // Real-time updates every 5 seconds
    setInterval(updateData, 5000);

    // Animate charts on load
    setTimeout(() => {
        trafficChart.update('none');
        pageViewsChart.update('none');
    }, 500);
});
