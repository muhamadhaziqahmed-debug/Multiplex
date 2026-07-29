/* =========================================================
   TAB WIDGET (Design / Advertising / Marketing)
   Clicking a tab swaps which one has the "active" look and
   replaces the panel content below it.
========================================================= */
const cross = document.getElementById('cross');
const displayChamge = document.getElementById('displayChamge');

cross.addEventListener('click', function () {
  displayChamge.style.display = 'none';
});

/* =========================================================
   MOBILE NAVIGATION (hamburger menu)
   Below 768px the nav links become a dropdown toggled by
   the hamburger button. Above 768px this has no effect,
   since the hamburger is hidden and the nav is always shown.
========================================================= */
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileNav = document.querySelector('.navbar nav');

hamburgerBtn.addEventListener('click', function () {
  const isOpen = mobileNav.classList.toggle('nav-open');
  hamburgerBtn.setAttribute('aria-expanded', isOpen);
});

// Close the mobile menu after a nav link is tapped, so it
// doesn't stay open covering the page content.
mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('nav-open');
    hamburgerBtn.setAttribute('aria-expanded', false);
  });
});

/* =========================================================
   BLOG CAROUSEL (prev/next)
   The blog section only has 4 real cards, which isn't enough
   to slide "infinitely" on its own. So we clone the 4 cards
   once before themselves and once after themselves (12 cards
   total) and place them in a track that we slide with
   transform. Whichever direction we slide, there's always a
   ready-made clone waiting to come into view.

   Once we've slid a full copy's width away from the middle
   copy, we jump straight back to the middle copy with no
   transition. Because the clones are identical to the
   originals, that jump is invisible, and the loop can repeat
   forever.
========================================================= */
const blogGrid = document.querySelector('.blog-grid');
const blogTrack = document.createElement('div');
blogTrack.className = 'blog-grid-track';

const originalBlogItems = Array.from(blogGrid.children);

function cloneBlogItems() {
  return originalBlogItems.map((item) => {
    const clone = item.cloneNode(true);
    clone.classList.add('blog-clone');
    return clone;
  });
}

const blogItemsBefore = cloneBlogItems();
const blogItemsAfter = cloneBlogItems();

[...blogItemsBefore, ...originalBlogItems, ...blogItemsAfter].forEach((item) => {
  blogTrack.appendChild(item);
});

blogGrid.innerHTML = '';
blogGrid.appendChild(blogTrack);

const BLOG_ITEM_COUNT = originalBlogItems.length; // 4
const BLOG_STEP_PERCENT = 100 / (BLOG_ITEM_COUNT * 3); // one card's share of the track
const BLOG_TRANSITION_MS = 400; // keep in sync with the CSS transition duration

let blogPosition = BLOG_ITEM_COUNT; // start on the middle (real) copy
let blogIsAnimating = false;

const blogNextBtn = document.getElementById('next');
const blogPrevBtn = document.getElementById('prev');

function setBlogTransform(withTransition) {
  if (!withTransition) {
    blogTrack.style.transition = 'none';
  }

  blogTrack.style.transform = `translateX(-${(blogPosition * BLOG_STEP_PERCENT).toFixed(4)}%)`;

  if (!withTransition) {
    // Force the browser to apply the jump immediately, before we
    // turn transitions back on for the next slide.
    void blogTrack.offsetWidth;
    blogTrack.style.transition = '';
  }
}

setBlogTransform(false);

function slideBlog(direction) {
  if (blogIsAnimating) return; // ignore extra clicks until the current slide finishes

  blogIsAnimating = true;
  blogNextBtn.disabled = true;
  blogPrevBtn.disabled = true;

  blogPosition += direction;
  setBlogTransform(true);

  setTimeout(() => {
    // Past one full copy in either direction: snap back to the
    // middle copy instantly. It looks identical, so no jump is seen.
    if (blogPosition >= BLOG_ITEM_COUNT * 2) {
      blogPosition -= BLOG_ITEM_COUNT;
      setBlogTransform(false);
    } else if (blogPosition <= 0) {
      blogPosition += BLOG_ITEM_COUNT;
      setBlogTransform(false);
    }

    blogIsAnimating = false;
    blogNextBtn.disabled = false;
    blogPrevBtn.disabled = false;
  }, BLOG_TRANSITION_MS);
}

blogNextBtn.addEventListener('click', () => slideBlog(1));
blogPrevBtn.addEventListener('click', () => slideBlog(-1));

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

const sliderImages = document.querySelectorAll('.slider-img');

const images = ['Grid-2.png', 'Grid2 mark2.png', 'Grid2 mark3.png', 'Grid2 mark4.png'];

let i = 0;

function prev() {
  i--;

  if (i < 0) i = images.length - 1;

  setImg();
}

function next() {
  i++;

  if (i >= images.length) i = 0;

  setImg();
}

function setImg() {
  sliderImages.forEach((img) => {
    img.src = 'Images/' + images[i];
  });
}
