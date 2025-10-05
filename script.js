document.addEventListener('DOMContentLoaded', () => {
    // Örnek Maç Verileri - Daha fazla çeşitlilik ekledik
    const matchesData = [
        {
            league: "Süper Lig", homeTeam: { name: "FENERBAHÇE", logo: "https://via.placeholder.com/40/FFEB3B/000000?text=FB" },
            awayTeam: { name: "BEŞİKTAŞ", logo: "https://via.placeholder.com/40/000000/FFFFFF?text=BJK" },
            homeScore: 3, awayScore: 2, status: "CANLI", time: "78'", type: "live"
        },
        {
            league: "Şampiyonlar Ligi", homeTeam: { name: "REAL MADRID", logo: "https://via.placeholder.com/40/FFFFFF/000000?text=RMD" },
            awayTeam: { name: "PSG", logo: "https://via.placeholder.com/40/003366/FFFFFF?text=PSG" },
            homeScore: 1, awayScore: 1, status: "CANLI", time: "HT", type: "live"
        },
        {
            league: "Premier Lig", homeTeam: { name: "LIVERPOOL", logo: "https://via.placeholder.com/40/C8102E/FFFFFF?text=LVP" },
            awayTeam: { name: "MAN CITY", logo: "https://via.placeholder.com/40/6CABDD/000000?text=MNC" },
            homeScore: null, awayScore: null, status: "YAKINDA", time: "Bugün, 21:00", type: "upcoming"
        },
        {
            league: "Serie A", homeTeam: { name: "MILAN", logo: "https://via.placeholder.com/40/FF0000/000000?text=ACM" },
            awayTeam: { name: "INTER", logo: "https://via.placeholder.com/40/000080/FFFFFF?text=INT" },
            homeScore: 0, awayScore: 0, status: "MS", time: "TAMAMLANDI", type: "finished"
        }
    ];

    const container = document.getElementById('match-cards-container');

    /**
     * Maç Kartı Oluşturma Fonksiyonu
     */
    function createMatchCard(match) {
        const card = document.createElement('div');
        card.classList.add('match-card', match.type);
        
        // Skor ve Zaman/Buton için dinamik içerik
        const homeScore = match.homeScore !== null ? match.homeScore : '-';
        const awayScore = match.awayScore !== null ? match.awayScore : '-';
        
        let buttonHTML = '';
        let statusClass = '';

        if (match.type === 'live') {
            buttonHTML = `<button class="watch-button"><i class="fas fa-satellite-dish"></i> Hemen İzle</button>`;
            statusClass = 'live-status';
        } else if (match.type === 'upcoming') {
            buttonHTML = `<button class="watch-button reminder-button"><i class="fas fa-bell"></i> Hatırlatıcı Kur</button>`;
        } else { // finished
            buttonHTML = `<button class="watch-button replay-button"><i class="fas fa-tv"></i> Özet İzle</button>`;
        }

        card.innerHTML = `
            <div class="match-header">
                <span class="status ${statusClass}">${match.status}</span>
                <span class="league">${match.league}</span>
            </div>
            <div class="teams">
                <div class="team">
                    <img src="${match.homeTeam.logo}" alt="${match.homeTeam.name} Logo">
                    <span>${match.homeTeam.name}</span>
                </div>
                <div class="score">
                    <span>${homeScore}</span> - <span>${awayScore}</span>
                </div>
                <div class="team">
                    <img src="${match.awayTeam.logo}" alt="${match.awayTeam.name} Logo">
                    <span>${match.awayTeam.name}</span>
                </div>
            </div>
            <div class="match-info">
                <span class="time">${match.time}</span>
                ${buttonHTML}
            </div>
        `;

        // Butonlara tıklama olayı ekleme
        card.querySelector('button').addEventListener('click', () => {
            alert(`Aksiyon: ${match.homeTeam.name} vs ${match.awayTeam.name} - Durum: ${match.status}`);
        });

        return card;
    }

    // Kartları sayfaya yükleme
    container.innerHTML = ''; // HTML'deki placeholder'ı temizle
    matchesData.forEach(match => {
        container.appendChild(createMatchCard(match));
    });

    // Navigasyon ve Smooth Scroll
    document.querySelectorAll('.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Aktif sınıfını güncelle
            document.querySelector('.nav-item.active').classList.remove('active');
            this.classList.add('active');

            const targetId = this.getAttribute('data-section');
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
