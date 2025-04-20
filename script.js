
// Trading Journal
function saveJournal() {
  const entry = document.getElementById('journalEntry').value;
  localStorage.setItem('journal', entry);
  alert('Journal saved!');
}
function exportJournal() {
  const entry = localStorage.getItem('journal') || '';
  const blob = new Blob([entry], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'WealthWell_Journal.pdf';
  link.click();
}

// Emotion Tracker
let emotions = [];
function trackEmotion() {
  const emotion = document.getElementById('emotionInput').value;
  if (!emotion) return;
  emotions.push(emotion);
  localStorage.setItem('emotions', JSON.stringify(emotions));
  updateChart();
}

let chartInstance = null; // global chart instance

function updateChart() {
  const emotionCounts = emotions.reduce((acc, emo) => {
    acc[emo] = (acc[emo] || 0) + 1;
    return acc;
  }, {});
  // Destroy old chart if it exists
  if (chartInstance !== null) {
    chartInstance.destroy();
  }
  
  const ctx = document.getElementById('emotionChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(emotionCounts),
      datasets: [{
        label: 'Emotion Frequency',
        data: Object.values(emotionCounts),
        backgroundColor: '#00ffcc'
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('emotions'));
  if (saved) { emotions = saved; updateChart(); }
});

// Mindset Log
function logMindset() {
  const date = document.getElementById('mindsetDate').value;
  const note = document.getElementById('mindsetNote').value;
  if (!date || !note) return;
  localStorage.setItem(`mindset-${date}`, note);
  alert('Mindset logged!');
}
