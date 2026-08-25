const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const newsGrid = document.querySelector('.news-grid');
const newsPrev = document.querySelector('.news-prev');
const newsNext = document.querySelector('.news-next');

if (newsGrid && newsPrev && newsNext) {
  const cards = Array.from(newsGrid.querySelectorAll('article'));
  const cardCount = cards.length;
  let currentIndex = 0;

  function getVisibleCards() {
    return window.innerWidth <= 950 ? 1 : 3;
  }

  function updateNewsCarousel() {
  const visibleCards = getVisibleCards();
  const maxIndex = Math.max(0, cardCount - visibleCards);

  currentIndex = Math.min(currentIndex, maxIndex);

  // Make the track wide enough to physically contain every card
  newsGrid.style.width =
    `${(cardCount / visibleCards) * 100}%`;

  // Give every card exactly one slot in that track
  cards.forEach((card) => {
    card.style.flex =
      `0 0 ${100 / cardCount}%`;
  });

  const cardWidth = cards[0].getBoundingClientRect().width;

  newsGrid.style.transform =
    `translateX(-${currentIndex * cardWidth}px)`;

  newsPrev.disabled = currentIndex === 0;
  newsNext.disabled = currentIndex >= maxIndex;
}

  newsNext.addEventListener('click', () => {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visibleCards);

    if (currentIndex < maxIndex) {
      currentIndex += 1;
      updateNewsCarousel();
    }
  });

  newsPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateNewsCarousel();
    }
  });

  window.addEventListener('resize', updateNewsCarousel);

  updateNewsCarousel();
}
