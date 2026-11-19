/* ============================================================
   THE BROTHERS FOUNDATION — EDITABLE SITE CONTENT
   ------------------------------------------------------------
   Everything a non-developer may need to change lives here.
   Edit the values below, save, and refresh the page.
   Do not edit index.html for content changes.
   ============================================================ */

const SITE_DATA = {
  site: {
    name: "The Brothers Foundation",
    tagline: "Together We Make A Difference.",
    founded: 2021,
  },

  /* ---------- EVENTS (newest first) ----------
     date: ISO date used in <time datetime="...">
     displayDate: what visitors see
  ------------------------------------------- */
  events: [
    {
      title: "Together We Make A Difference",
      date: "2025-04-18",
      displayDate: "April 18, 2025",
      location: "Dagomb Primary & JHS",
      label: "Past event",
    },
    {
      title: "Together We Make A Difference",
      date: "2024-03-29",
      displayDate: "March 29, 2024",
      location: "Pakyi",
      label: "Past event",
    },
    {
      title: "Together We Make A Difference",
      date: "2023-04-07",
      displayDate: "April 7, 2023",
      location: "Brekum",
      label: "Past event",
    },
  ],

  /* ---------- NEWS (newest first) ----------
     Excerpts are intentionally placeholders until supplied.
  ------------------------------------------- */
  news: [
    {
      title: "Save a Child, Change the Future",
      date: "2020-07-09",
      displayDate: "July 9, 2020",
      author: "Sandra Andoh",
      excerpt: "[excerpt to be supplied]",
    },
    {
      title: "How We Are Changing Lives, One Child at a Time",
      date: "2020-06-17",
      displayDate: "June 17, 2020",
      author: "Sandra Andoh",
      excerpt: "[excerpt to be supplied]",
    },
    {
      title: "Every Child Deserves a Chance",
      date: "2020-06-12",
      displayDate: "June 12, 2020",
      author: "Sandra Andoh",
      excerpt: "[excerpt to be supplied]",
    },
    {
      title: "Be the Hope a Child Needs",
      date: "2020-06-10",
      displayDate: "June 10, 2020",
      author: "Sandra Andoh",
      excerpt: "[excerpt to be supplied]",
    },
  ],

  /* ---------- DONATION DETAILS (information only) ----------
     Online payment is NOT live. These details are displayed
     for information and must be verified before launch.
  ---------------------------------------------------------- */
  donation: {
    mobileMoney: "0530445561",
    mobileMoneyHref: "tel:+233530445561",
    bank: {
      name: "Ecobank",
      accountName: "THE BROTHERS FOUNDATION",
      accountNumber: "1441004769184",
    },
    note: "Details to be verified by the foundation before launch.",
  },

  /* ---------- CONTACT ---------- */
  contact: {
    phone: "024 418 85 41",
    phoneHref: "tel:+233244188541",
    mobile: "024 007 03 30",
    mobileHref: "tel:+233240070330",
    email: "info@thebrotherfoundation.org",
    address: "Hudson Road, Mckeown Asokwa, Ghana",
  },

  /* ---------- IMPACT ----------
     No verified figures have been supplied. Do not invent
     statistics — keep verified:false and a written statement.
  ------------------------------- */
  impact: {
    verified: false,
    statement:
      "We do not publish numbers until they have been verified. What we can commit to is the way we work: alongside the community, in the open, with the goal of lasting change. Verified figures and reports will be published here once they are available.",
    // Populate and set verified:true only after the foundation supplies and signs off figures.
    // stats: [{ icon: "volunteers|donations|projects|missions", value: "100+", label: "Volunteers" }, ...]
    stats: [],
  },
};

window.SITE_DATA = SITE_DATA;
