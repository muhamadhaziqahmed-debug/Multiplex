const panel = document.querySelector('.panel');
const tabs = document.querySelectorAll('.tab');

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

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    tabs.forEach((t) => t.classList.remove('active'));

    // Add active class to clicked tab
    tab.classList.add('active');

    // Change panel content
    panel.innerHTML = tabContent[tab.textContent.trim()];
  });
});
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

let current = 0;

const quote = document.getElementById('quote');
const author = document.getElementById('author');
const dots = document.querySelectorAll('.dot');

function updateTestimonial() {
  quote.textContent = testimonials[current].quote;

  author.innerHTML = `
    <strong>${testimonials[current].author}</strong>, ${testimonials[current].company}
  `;

  dots.forEach((dot) => dot.classList.remove('active'));
  dots[current].classList.add('active');
}

// Next Button
document.getElementById('testimonial-next').addEventListener('click', () => {
  current++;

  if (current >= testimonials.length) {
    current = 0;
  }

  updateTestimonial();
});

// Previous Button
document.getElementById('testimonial-prev').addEventListener('click', () => {
  current--;

  if (current < 0) {
    current = testimonials.length - 1;
  }

  updateTestimonial();
});

// Click on dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    current = index;
    updateTestimonial();
  });
});

// Show first testimonial
updateTestimonial();
setInterval(() => {
  current++;

  if (current >= testimonials.length) {
    current = 0;
  }

  updateTestimonial();
}, 5000);
