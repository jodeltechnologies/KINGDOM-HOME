# Our Kingdom Home

A family app for one household in Buea. Five ways to love a wife, grounded in Scripture. A
WhatsApp writer that sounds like a man and not like a machine. A family altar record, Bible
studies for husband and wife, and the children's existing *Sincere Milk* link. A devotion roster
you can print or download as Word.

No build step. No framework. No `npm install`. Plain HTML, CSS and JavaScript, plus one
serverless function. If you can push to GitHub you can deploy this.

---

## What is in here

```
index.html               the interface, seven tabs and three adult Bible views
styles.css               design system, colours taken from your photograph
data.js                  messages, the five loves, readings for four tracks
practices.js             the 47 Evans family practices, verses and little-ones track
app.js                   all the logic
steps.js                 the Steps tab: practices, name cards, shoebox, verses
bible-data.js            12 topic studies, 20 character profiles, 8 reading methods
bible-events.js          preserved original event lessons and stable IDs
bible-event-library.js   300 separate event studies in 26 related groups
bible.js                 adult study journals, progress, schedules, and import merging
sw.js                    service worker, this is what makes Install appear on Android
manifest.webmanifest     app name, icons, home screen behaviour
vercel.json              headers, mainly so the service worker updates properly
api/write.js             serverless function, calls Groq with your key kept on the server
supabase/schema.sql      run once, gives you sync between two phones
img/                     your photograph, hero and background
icons/                   app icons
.env.example             copy to .env.local for local work
```

---

## 1. GitHub

```bash
cd kingdom-home
git init
git add .
git commit -m "Kingdom Home"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/kingdom-home.git
git push -u origin main
```

Make the repository **private**. Your wedding photograph is in it, and later your household
code may end up in a screenshot. Nothing here needs to be public.

`.gitignore` already excludes `.env` and `.env.local`. Never commit a Groq key.

---

## 2. Vercel

1. Go to vercel.com, sign in with GitHub, **Add New, Project**, pick `kingdom-home`.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. **Deploy**.

You get a URL like `kingdom-home.vercel.app`. Open it on your phone in Chrome.

### The Groq key

In Vercel: **Settings, Environment Variables**.

| Name | Value | Notes |
|---|---|---|
| `GROQ_API_KEY` | `gsk_...` | from console.groq.com/keys |
| `APP_PASSCODE` | leave empty | optional, see below |

Then **Deployments, Redeploy**. Environment variables only apply to builds made after you add them.

In the app: **Set up, Groq, Through my Vercel site**. Nothing to paste. Press **Test the connection**.

`APP_PASSCODE` is optional. If you set it, `/api/write` refuses any request that does not carry
the same value in an `x-kh-pass` header. Only worth doing if you make the repository public or
start sharing the URL. For a private URL that only you and your wife know, leave it blank.

---

## 3. Keeping two phones in step

Two ways. Read this before choosing.

### The file (recommended)

**Set up, Share with her, Save our file.** It downloads a small JSON file. Send it to her on
WhatsApp. She opens the app, taps **Open one she sent**, picks the file. Done.

It **merges**, it does not overwrite. If you both wrote altar notes on the same evening you keep
both, stacked. Practices keep whichever of you started them first. Sent messages and logged acts
are unioned with duplicates removed. Names and name-card wording are only filled in where the
receiving phone is blank, so her wording is never wiped by yours.

Nothing to sign up for, nothing to keep awake, and your family's notes never leave the two phones.
Do it on a Sunday and that is enough.

### Supabase, and the pause you should know about

Supabase pauses Free plan projects after 7 days of low activity. Their own guidance is that
"a few user requests to the database each day" is what keeps a project out of the pause list, so a
household of two doing a weekly sync is exactly the profile that gets paused. When it pauses, sync
silently stops until someone presses **Resume** in the dashboard. Data survives, and you have a
year to restore it.

`.github/workflows/keepalive.yml` prevents this by calling `kh_pull` once a day. Add three
repository secrets under **Settings, Secrets and variables, Actions**: `SUPABASE_URL`,
`SUPABASE_KEY` and `HOUSEHOLD_CODE`. Run it once by hand from the Actions tab to check it goes
green. One caveat: GitHub disables scheduled workflows after 60 days with no repository activity.
It emails you first and re-enabling is one button.

Vercel does not pause hobby projects, so the app itself stays up regardless.

## 3b. Supabase, optional

Only needed if you want both phones showing the same roster, altar record and notes. Skip it and
everything still works, it just lives on one phone.

1. supabase.com, **New project**.
2. **SQL Editor, New query**. Paste all of `supabase/schema.sql`. **Run**.
3. **Project Settings, API**. Copy the **Project URL** and the **anon public** key.
4. In the app: **Set up, Supabase**. Paste both. Press **Make one** to generate a household code.
5. **Send this phone up**. On her phone, enter the same three values and press **Pull hers down**.

The anon key is designed to be public, so it is safe in the app. The household code is not. It is
the only thing standing between your family notes and anyone who guesses it, which is why the
generator makes it eighteen random characters. Treat it like a house key.

The schema locks the table completely and exposes only two functions, `kh_push` and `kh_pull`,
both of which demand the code. There is no way to list households or enumerate codes.

### What is actually sent

One JSON object, roughly 15 KB, defined by `SYNCED` in `app.js`. It contains: both your names and
her number; the family profile (ages, children's names, name-card meanings and verses); the
roster; the altar record including every note you have typed; acts logged; the messages you have
sent her; which practices you have started; the give/save/spend box; and your reminder times.

Deliberately excluded: the Groq API key, the Supabase connection details themselves, and per-phone
preferences such as the last mood chip you tapped. If you want to see the exact payload before
trusting it, open **Set up, Export everything** — the file it downloads is the same shape.

Note that **Pull hers down** replaces this phone's data rather than merging it. Last writer wins.
Agree with your wife who pushes and who pulls, or you will overwrite each other's notes.

---

## 4. Groq, the message writer

Two ways to connect, chosen under **Set up**.

**Through my Vercel site.** The key sits in a Vercel environment variable and never reaches the
phone. Use this one.

**Key on this phone.** For GitHub Pages, Netlify or anywhere without serverless functions. The key
is stored in the browser and sent directly from the phone. Fine on your own phone, never on a
shared computer, and never hardcoded into a file you push.

Either way, set a spend limit on your Groq account.

### Models

Defaults are `openai/gpt-oss-120b` and `openai/gpt-oss-20b`. Groq retired the Llama chat models in
June 2026, so anything you read online referring to `llama-3.3-70b-versatile` is out of date. Groq
changes its lineup often, so the app has a **Load models from my account** button that pulls the
live list from `/openai/v1/models`. Use it if a model name stops working.

### Making it sound human

The system prompt is in `api/write.js` and mirrored in `app.js`. Keep the two the same if you edit
one. What it does:

- caps every line at eighteen words, because length is the loudest AI tell
- bans the giveaway vocabulary outright: cherish, treasure, appreciate, grateful, journey, deeply,
  soulmate, my everything, and the rest
- bans em dashes, semicolons, rhyme, and the "not just X, but Y" construction
- gives six examples in the exact register wanted and three examples of what to never write
- forces it to use the detail you typed in the box

That last one matters most. **"i owe u an evening"** could go to anybody. **"i saw ur eyes this
morning, thank u for sitting up with the baby"** could only go to her. Type what actually happened,
and read the line before you send it. If it does not sound like your mouth, change a word or throw
it away.

---

## 5. Install on Android

Open your Vercel URL in Chrome, three dots, **Install app**. Because there is a real service worker
and manifest here, the full install prompt appears rather than just a bookmark shortcut. It opens
full screen and works with no signal.

Reminders inside the app only fire while it is open. For alarms that ring when it is closed, use
**Set up, Download the calendar file** and add it to Google Calendar.

---

## 6. Local work

```bash
npx vercel dev     # serves the site and /api/write together, reads .env.local
# or, without the serverless function:
python3 -m http.server 8080
```

`file://` will not work. The service worker needs `http` or `https`.

After changing any file, bump `CACHE` in `sw.js` from `kingdom-home-v1` to `-v2`. Otherwise phones
keep serving the old copy from cache and you will think the deploy failed.

---

## Adult Bible library and children's devotion

The Altar tab opens three adult sections: **Bible studies for us**, **Bible character studies**,
and **Bible reading plans**. The adult Daily Manna button has been removed. The children's
Sincere Milk link, reading tracks, memory verses, activities, and roster options stay available.
The original `practices.js` and `steps.js` files are unchanged.

There are 312 studies for husband and wife: 12 topic studies and 300 separate event studies
in 26 related groups from Genesis to Revelation. Every lesson includes
context, at least three explained points with Scripture references, discussion questions, an
action, prayer, and a linked Matthew Henry companion commentary. Select Studies by Bible event
to filter by Testament, book, or related group. Each event has a separate journal and completion
record. Previous and Next navigate only the matching lessons. All twelve original event IDs
remain available for earlier saved records.

The collection has 178 Old Testament and 122 New Testament lessons. The plagues, resurrection
encounters, and seven church messages each have individual lessons. Revelation visions are
identified as visions; dates are not assigned to their future fulfilment. This is a substantial
selection rather than a claim to include every event in Scripture. See EVENT_STUDY_INDEX.txt
for the complete lesson list and UPDATE_GUIDE.txt for website update instructions.

Twenty character profiles include background, strengths, failures or textual limitations, four
explained lessons, questions, action, and prayer. Profiles do not invent moral failures where the
selected biblical narrative does not record one.

The eight reading methods are whole Bible in 365 days, paired Testaments in 365 days, New
Testament in 90 days, Old Testament in 270 days, Gospels in 30 days, Psalms in 30 days, Proverbs in
31 days, and a 28-day topical selection. Complete plans use the 66-book Bible and include every
target chapter once. Paired readings include the Old Testament daily and the New Testament on
260 days. Each method preserves its own start date, notes, completed days, and current position.
Dates display as day/month/year. Download the current plan as CSV from its schedule card.

Study and reading notes autosave as you type. Completion is reversible. **First unread day**
resumes a reading plan; **Today's scheduled reading** uses the saved start date. Changing the
start date retains existing notes and completed days. The existing backup and optional sync
include the adult library records. Imports retain both phones' notes and use the latest dated
record for a completion change.

The screenshot's six study Bibles appear as companion resource links, alongside Matthew Henry
and BibleProject. Their licensed notes are not bundled. Publisher pages supply previews or
edition details; use your own licensed edition for complete notes. The NIV resource currently
opens the publisher's NIV catalogue, where the title should be searched. Scripture and external
resources need internet. Original lessons, plan references, journals, and progress work offline
after the updated app has loaded once and its service worker has cached the files.

For a passage outside the lesson collection, use **Study another passage**. This opens Scripture,
Matthew Henry's book list, observation questions, and a saved notebook. It does not invent an
automatic commentary for an arbitrary reference.

Sincere Milk is written and owned by Deeper Christian Life Ministry. The app holds the family's
own records and links outward to the ministry's site for the children's devotional text.

The original family reading, Bible person, and Bible event tracks remain in `data.js` as
`CANON`, `CHARS` and `EVENTS`, four fields each:
reference, title, question for the children, prayer point. Add to them freely.


---

## The Steps tab

`practices.js` holds 47 things Tony and Lois Evans describe actually doing in their own
home, taken chapter by chapter from *Raising Kingdom Kids*. Each one carries two fields:

- `e` — what he did, as the book records it
- `y` — how it works in a house with a 5, a 4 and a 1 year old

and a `start` value of either `'now'` or an age. The list re-sorts itself against the ages you
enter under **Your house**, so as the children grow, practices move from *Wait for their age*
into *Start now* on their own. Seven of the forty-seven are currently waiting: table manners at
six, school consequences at five, friendships at eight, the eagle story at six, earned freedom
at seven, the purity conversation at sixteen, and paid work at fourteen.

The **Little ones** reading track in `practices.js` (`LITTLE`, 60 entries) is written for children
under six: short narrative passages, one plain question a 4 year old can answer, one thing to
pray. It is the default in the roster and on the Altar tab while your eldest is seven or under.
`LITTLEVERSES` holds 24 memory verses of five to eight words, one a fortnight for a year.
