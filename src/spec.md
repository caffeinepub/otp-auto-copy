# Specification

## Summary
**Goal:** Build a professional, offline-first documentation hub for the “OTP Auto Copy” Android app concept, including security/compliance guidance, Kotlin samples, and a small in-browser OTP extraction playground.

**Planned changes:**
- Create a navigable documentation layout (e.g., sidebar/top nav with anchors) covering: architecture (MVVM + Clean Architecture), required permissions, OTP detection approach (SMS User Consent API / SMS Retriever API) with policy rationale, OTP regex/extraction (4–8 digits) and non-OTP ignoring heuristics, Kotlin sample snippets (Consent/Retriever handling, parsing, clipboard, auto-clear timer), UI screen specs (Settings, Permissions, About), Play Store compliance checklist, and privacy policy outline (offline-only; no storage/transmission).
- Add a clearly labeled “Platform & Limitations” section explaining that Android SMS detection APIs cannot run in a browser-based web app.
- Implement an offline-only OTP extraction playground: paste SMS input, extract 4–8 digit OTP (or show “no OTP detected”), copy OTP to clipboard with feedback text exactly “OTP copied”, and an optional auto-clear clipboard timer (15s/30s/60s/never).
- Enforce offline-only behavior: no analytics, no network calls for OTP features, no logging OTP content, and no persistence of OTP values; only store non-sensitive preferences (e.g., clipboard clear delay) if persistence is used.
- Apply a consistent, security/privacy-focused visual theme across docs and playground, using a non-blue/non-purple primary palette.

**User-visible outcome:** Users can browse well-structured English documentation for the “OTP Auto Copy” Android design (including compliance/privacy guidance and Kotlin examples) and use an offline playground to extract and copy OTPs with an optional clipboard auto-clear timer.
