/* ============================================================================
   PROJECTS DATA  —  this is the only file you edit to add or change a project.
   ============================================================================

   Copy one of the blocks below, paste it at the top of the list, and fill it in.
   Nothing else in the site needs to change; the cards, the filter chips and the
   detail popup are all generated from this array.

   FIELD REFERENCE
   ---------------
   id          unique short slug, lowercase, no spaces        (required)
   title       project name shown on the card                 (required)
   year        "2026" or "2025 — 2026"                        (required)
   role        e.g. "Full-stack", "Solo build", "Team of 2"   (required)
   featured    true  -> also appears on the home page
   summary     one or two sentences for the card              (required)
   description array of paragraphs for the popup
   highlights  array of short bullet points ("What it does")
   tech        array of technologies — these also become the filter chips
   thumb       card image. 16:10 works best (e.g. 1200x750)
   media       gallery items shown in the popup. Three kinds:
                 { type: "image",   src: "assets/img/projects/x.jpg", alt: "..." }
                 { type: "video",   src: "assets/video/x.mp4", poster: "assets/img/projects/x.jpg" }
                 { type: "youtube", id: "dQw4w9WgXcQ", title: "Demo walkthrough" }
   links       buttons at the bottom of the popup. icon is "github",
               "external" or "play".

   A NOTE ON VIDEO
   ---------------
   GitHub refuses files over 100 MB and Pages gets slow well before that. Keep
   self-hosted .mp4 clips under ~20 MB, or upload to YouTube as "Unlisted" and
   use { type: "youtube", id: "..." } instead — that costs your repo nothing.

   Missing images do not break the layout: a neutral placeholder is shown until
   you drop the real file in.
   ========================================================================== */

const PROJECTS = [

  {
    id: "altrium",
    title: "Altrium CRM",
    year: "2026",
    role: "Full-stack",
    featured: true,

    summary:
      "A CRM for a small sales team: companies, contacts, leads that convert " +
      "into deals, a drag-and-drop pipeline and follow-ups that chase you when " +
      "they fall overdue.",

    description: [
      "Altrium is a customer relationship manager built as two separate services: " +
      "a C#/.NET REST API that owns the database, and a JavaScript front end that " +
      "consumes it. Keeping them apart meant designing a real API contract rather " +
      "than letting the two halves reach into each other.",

      "It covers the full path a sale actually takes. A lead arrives and gets " +
      "triaged as new, contacted, qualified or lost. Qualifying it converts it " +
      "into a contact and a deal, and the deal then moves across a five stage " +
      "pipeline board until it is won or lost. A dashboard sits on top of all of " +
      "it, totalling open pipeline value, win rate and anything overdue.",

      "Accounts are provisioned, not self served. There is no sign-up page: a " +
      "leadership user creates accounts and resets passwords, and roles are set " +
      "centrally rather than chosen by the person signing in.",

      "Deleting is reversible. Records move to a Recently deleted view that keeps " +
      "their type, owner and deletion time, and restoring one puts it back where " +
      "it was instead of creating a fresh copy."
    ],

    highlights: [
      "Deal pipeline as a drag-and-drop board across five stages, with live per-stage counts and values",
      "Leads convert straight through into a contact and a deal",
      "Dashboard totalling open pipeline, win rate, lead funnel and overdue follow-ups",
      "Soft delete with a restore queue, so nothing is destroyed outright",
      "Accounts provisioned by a leadership role, with passwords reset centrally",
      "Search plus owner, company and type filters on every list"
    ],

    tech: ["C#", "ASP.NET Core", "JavaScript", "REST API", "SQL"],

    thumb: "assets/img/projects/altrium-cover.jpg",

    media: [
      { type: "image", src: "assets/img/projects/altrium-dashboard.jpg",
        alt: "Dashboard showing open pipeline, win rate, pipeline by stage and overdue follow-ups" },
      { type: "image", src: "assets/img/projects/altrium-deals.jpg",
        alt: "Deals board with drag-and-drop cards across Prospecting, Proposal, Negotiation, Won and Lost" },
      { type: "image", src: "assets/img/projects/altrium-leads.jpg",
        alt: "Leads list with status pills and a convert action on each row" },
      { type: "image", src: "assets/img/projects/altrium-companies.jpg",
        alt: "Companies list showing industry, website, phone and owner" },
      { type: "image", src: "assets/img/projects/altrium-contacts.jpg",
        alt: "Contacts list grouped by company" },
      { type: "image", src: "assets/img/projects/altrium-deleted.jpg",
        alt: "Recently deleted view with each record's type, owner, deletion time and a restore action" },
      { type: "image", src: "assets/img/projects/altrium-account.jpg",
        alt: "Account settings dialog with profile details and a change password form" },
      { type: "image", src: "assets/img/projects/altrium-signin.jpg",
        alt: "Sign in screen, with accounts provisioned by a leadership user" }
    ],

    links: [
      { label: "Frontend repo", url: "https://github.com/deMel0729/Altrium-Project-Frontend", icon: "github" },
      { label: "Backend repo",  url: "https://github.com/deMel0729/Altrium_Project_Backend",  icon: "github" }
    ]
  },

  {
    id: "space-invaders",
    title: "Space Invaders",
    year: "2026",
    role: "Team of 2",
    featured: true,

    summary:
      "A Space Shooter built in Python with Pygame — sprite collision, wave " +
      "spawning and a game loop written from scratch with a friend.",

    description: [
      "A take on the arcade classic, built with Python and the Pygame library. " +
      "Everything runs off a hand-written game loop: input handling, sprite movement, " +
      "collision detection and rendering, all stepped once per frame.",

      "Built together with a friend, which made it the first project where I had to " +
      "think about splitting work across a shared repository instead of committing " +
      "straight to main.",

    ],

    highlights: [
      "Game loop, input handling and rendering written from scratch",
      "Sprite-based collision detection",
      "Progressive enemy waves",
      "Live score counter and a depleting health bar"
    ],

    tech: ["Python", "Pygame", "Game Loop"],

    thumb: "assets/img/projects/space-invaders-cover.jpg",

    media: [
      { type: "video",
        src: "assets/video/space-invaders-demo.mp4",
        poster: "assets/img/projects/space-invaders-cover.jpg" },
      { type: "image", src: "assets/img/projects/space-invaders-1.jpg",
        alt: "Opening wave, score 20, health bar full" },
      { type: "image", src: "assets/img/projects/space-invaders-2.jpg",
        alt: "Mid-run, score 80, health bar half depleted" },
      { type: "image", src: "assets/img/projects/space-invaders-3.jpg",
        alt: "Late run, score 140, health bar almost empty" }
    ],

    links: [
      { label: "View repo", url: "https://github.com/deMel0729/Space-Invaders", icon: "github" }
    ]
  }

  /* ---------------------------------------------------------------------
     NEXT PROJECT — uncomment this block and fill it in.

  ,{
    id: "my-project",
    title: "My Project",
    year: "2026",
    role: "Solo build",
    featured: false,
    summary: "One or two sentences for the card.",
    description: [
      "First paragraph.",
      "Second paragraph."
    ],
    highlights: [
      "Something it does",
      "Something else it does"
    ],
    tech: ["JavaScript", "CSS"],
    thumb: "assets/img/projects/my-project-cover.jpg",
    media: [
      { type: "image", src: "assets/img/projects/my-project-1.jpg", alt: "Screenshot" }
    ],
    links: [
      { label: "View repo", url: "https://github.com/deMel0729/my-project", icon: "github" }
    ]
  }

  --------------------------------------------------------------------- */

];
