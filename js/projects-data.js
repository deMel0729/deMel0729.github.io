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
    title: "Altrium",
    year: "2026",
    role: "Full-stack",
    featured: true,

    summary:
      "A full-stack web application with a C#/.NET REST API and a JavaScript " +
      "front end, built as two separate services that talk over HTTP.",

    description: [
      "Altrium is split into two repositories: a C#/.NET back end that owns the " +
      "database and exposes a REST API, and a JavaScript front end that consumes it. " +
      "Keeping them separate meant designing a real API contract rather than letting " +
      "the two halves reach into each other.",

      "TODO — replace this paragraph with the real story: what problem Altrium solves, " +
      "who it is for, and the one technical decision you are most pleased with."
    ],

    highlights: [
      "REST API built with C# and ASP.NET Core",
      "Separate JavaScript front end consuming the API",
      "Relational data model with Entity Framework",
      "TODO — add two or three more specific features"
    ],

    tech: ["C#", "ASP.NET Core", "JavaScript", "Entity Framework", "SQL", "REST API"],

    thumb: "assets/img/projects/altrium-cover.jpg",

    media: [
      { type: "image", src: "assets/img/projects/altrium-1.jpg", alt: "Altrium dashboard" },
      { type: "image", src: "assets/img/projects/altrium-2.jpg", alt: "Altrium detail view" }
      // Add a walkthrough when you record one:
      // { type: "video", src: "assets/video/altrium-demo.mp4", poster: "assets/img/projects/altrium-1.jpg" }
      // { type: "youtube", id: "PASTE_VIDEO_ID", title: "Altrium walkthrough" }
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

      "TODO — say who did what, and mention anything tricky you solved (frame timing, " +
      "collision bugs, difficulty scaling)."
    ],

    highlights: [
      "Game loop, input handling and rendering written from scratch",
      "Sprite-based collision detection",
      "Progressive enemy waves",
      "TODO — add scoring, sound, or whatever else it has"
    ],

    tech: ["Python", "Pygame", "Game Loop"],

    thumb: "assets/img/projects/space-invaders-cover.jpg",

    media: [
      { type: "image", src: "assets/img/projects/space-invaders-1.jpg", alt: "Space Invaders gameplay" }
      // Gameplay footage is the single best thing you can add here:
      // { type: "video", src: "assets/video/space-invaders.mp4", poster: "assets/img/projects/space-invaders-1.jpg" }
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
