/* =========================================================
   TAB WIDGET (Design / Advertising / Marketing)
   Clicking a tab swaps which one has the "active" look and
   replaces the panel content below it.
========================================================= */

const panel = document.querySelector('.panel');
const tabButtons = document.querySelectorAll('.tab');

// Content shown in the panel for each tab, keyed by the tab's label text.
// Using the label text as the key means we don't need a separate id
// on every button — the button's own text tells us which content to show.
const tabContent = {
  Design: `
    <p>
      consectetur adipisicing elit. Dolorum delectus fuga quae iure ad quas,
      tempora deleniti nobis laboriosam facilis, nam quis corrupti.
    </p>

    <div class="columns">
      <ul class="list">
        <li>Brand Identity</li>
        <li>Icons</li>
        <li>Identity Systems</li>
        <li>Identity Guidelines</li>
      </ul>

      <ul class="list">
        <li>Naming</li>
        <li>Packaging</li>
        <li>Posters</li>
        <li>Logos</li>
      </ul>
    </div>
  `,

  Advertising: `
    <p>
      We create advertising campaigns that connect your brand with the right
      audience, combining creativity and strategy to maximize engagement and
      business growth.
    </p>

    <div class="columns">
      <ul class="list">
        <li>Digital Campaigns</li>
        <li>Social Media Ads</li>
        <li>Display Advertising</li>
        <li>Print Media</li>
      </ul>

      <ul class="list">
        <li>Video Commercials</li>
        <li>Email Marketing</li>
        <li>Billboard Design</li>
        <li>Campaign Analytics</li>
      </ul>
    </div>
  `,

  Marketing: `
    <p>
      Our marketing services help businesses build strong customer
      relationships through effective planning, branding, and data-driven
      strategies.
    </p>

    <div class="columns">
      <ul class="list">
        <li>Market Research</li>
        <li>SEO Optimization</li>
        <li>Content Strategy</li>
        <li>Customer Insights</li>
      </ul>

      <ul class="list">
        <li>Lead Generation</li>
        <li>Email Campaigns</li>
        <li>Brand Growth</li>
        <li>Performance Reports</li>
      </ul>
    </div>
  `,
};

// Give every tab button a click handler that (1) moves the "active"
// class onto the clicked tab and (2) swaps the panel's HTML to match it.
tabButtons.forEach((tabButton) => {
  tabButton.addEventListener('click', () => {
    // Only one tab is active at a time, so clear it from all of them first...
    tabButtons.forEach((button) => button.classList.remove('active'));
    // ...then mark just the one that was clicked.
    tabButton.classList.add('active');

    // .trim() removes any stray whitespace around the button text so it
    // matches the keys in tabContent exactly (e.g. "Design", not " Design").
    const tabName = tabButton.textContent.trim();
    panel.innerHTML = tabContent[tabName];
  });
});

/* =========================================================
   TESTIMONIALS SLIDER
   Cycles through a list of quotes using the prev/next buttons,
   the dots, or automatically every 5 seconds.
========================================================= */

const testimonials = [
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem nam explicabo illo fuga harum perferendis aliquid, libero molestias debitis modi asperiores necessitatibus dolorem veritatis.',
    author: 'Jane Doe',
    company: 'ABC Company',
  },
  {
    quote:
      'Working with this team has been an amazing experience. Every project was delivered on time with excellent quality and communication.',
    author: 'John Smith',
    company: 'Creative Studio',
  },
  {
    quote:
      "Professional service, creative ideas and outstanding support. We couldn't be happier with the final results.",
    author: 'Sarah Khan',
    company: 'Tech Solutions',
  },
  {
    quote: 'Highly recommended! They understood our requirements perfectly and exceeded every expectation we had.',
    author: 'Michael Lee',
    company: 'Pixel Agency',
  },
];

// Index of whichever testimonial is currently showing.
let currentIndex = 0;

const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const dotEls = document.querySelectorAll('.dot');

// Renders whichever testimonial "currentIndex" points to, and keeps the
// dots in sync with it.
function showTestimonial(index) {
  const testimonial = testimonials[index];

  quoteEl.textContent = testimonial.quote;
  authorEl.innerHTML = `<strong>${testimonial.author}</strong>, ${testimonial.company}`;

  dotEls.forEach((dot) => dot.classList.remove('active'));
  dotEls[index].classList.add('active');
}

// Moves forward one testimonial, wrapping back to the start after the last one.
function goToNextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}

// Moves back one testimonial, wrapping to the end if we're on the first one.
function goToPreviousTestimonial() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
}

document.getElementById('testimonial-next').addEventListener('click', goToNextTestimonial);
document.getElementById('testimonial-prev').addEventListener('click', goToPreviousTestimonial);

// Clicking a dot jumps straight to that testimonial.
dotEls.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    showTestimonial(currentIndex);
  });
});

// Show the first testimonial as soon as the page loads.
showTestimonial(currentIndex);

// Auto-advance to the next testimonial every 5 seconds.
setInterval(goToNextTestimonial, 5000);
