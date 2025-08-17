
export const MEMBER_PROFILE = `
Preferred name: Rohan Patel
Date of birth, age, gender identity: 12 March 1979, 46, Male
Primary residence & frequent travel hubs: Singapore, frequently travels to UK, US, South Korea, Jakarta
Occupation / business commitments: Regional Head of Sales for a FinTech company with frequent international travel and high-stress demands.
Personal assistant: Sarah Tan

Top three health or performance goals (with target dates):
- Reduce risk of heart disease (due to family history) by maintaining healthy cholesterol and blood pressure levels by December 2026.
- Enhance cognitive function and focus for sustained mental performance in demanding work environment by June 2026.
- Implement annual full-body health screenings for early detection of debilitating diseases, starting November 2025.

"Why now?" - intrinsic motivations & external drivers: Family history of heart disease; wants to proactively manage health for long-term career performance and to be present for his young children.

Success metrics the member cares about (e.g. VO2max, biological age, stress resilience): Blood panel markers (cholesterol, blood pressure, inflammatory markers), cognitive assessment scores, sleep quality (Garmin data), stress resilience (subjective self-assessment, Garmin HRV).

Personality / values assessment: Analytical, driven, values efficiency and evidence-based approaches.
Stage of change & motivational interviewing notes: Highly motivated and ready to act, but time-constrained. Needs clear, concise action plans and data-driven insights.
Social support network: Wife is supportive; has 2 young kids; employs a cook at home which helps with nutrition management.
Mental-health history: No formal mental health history; manages work-related stress through exercise.

Wearables in use: Garmin watch (used for runs), considering Oura ring.
Health apps / platforms (Trainerize, MyFitnessPal, Whoop).
Data-sharing permissions & API access details: Willing to enable full data sharing from Garmin and any new wearables for comprehensive integration and analysis.
Desired dashboards or report cadence: Monthly consolidated health report focusing on key trends and actionable insights; quarterly deep-dive into specific health areas.

Service & Communication Preferences:
- Preferred channels important updates, and communication via PA (Sarah) for scheduling.
- Expects responses within 24-48 hours for non-urgent inquiries. For urgent health concerns, contact his PA immediately, who will then inform his wife.
- Prefers executive summaries with clear recommendations, but appreciates access to granular data upon request.

Scheduling & Logistics:
- Time budget: ~5 hours/week average for the plan
- Typical weekly availability blocks: Exercises every morning (20 min routine), occasional runs. Often travels at least once every two weeks.
- Upcoming travel calendar & time-zone shifts: Provided by PA monthly. Requires flexible scheduling.
`;

export const ELYX_TEAM = `
- Ruby (The Concierge / Orchestrator): Primary point of contact for logistics, scheduling, reminders. Voice: Empathetic, organized, proactive.
- Dr. Warren (The Medical Strategist): Physician and final clinical authority. Interprets lab results, analyzes records. Voice: Authoritative, precise, scientific.
- Advik (The Performance Scientist): Data analysis expert for wearable data (sleep, recovery, HRV, stress). Voice: Analytical, curious, pattern-oriented.
- Carla (The Nutritionist): Designs nutrition plans, analyzes food logs, makes supplement recommendations. Voice: Practical, educational, focused on behavioral change.
- Rachel (The PT / Physiotherapist): Manages physical movement: strength training, mobility, injury rehab. Voice: Direct, encouraging, focused on form and function.
- Neel (The Concierge Lead / Relationship Manager): Senior leader. Steps in for major strategic reviews, de-escalates frustrations. Voice: Strategic, reassuring, focused on the big picture.
`;

export const HIGH_LEVEL_PLAN = `
Follow this high-level intervention loop and rhythm:

- Week 1: Onboarding. Collect history, priorities, diet patterns; set initial goals; order baseline diagnostics.

- Weeks 2-4: Sample collection + physical exam; wearable setup/verification; initial plan draft.

- Weeks 4-8: Intermittent test results shared → classified as <act> major issues, <soft follow up> need follow-up, <note> all okay; member commits to lifestyle interventions.

- Weeks 8-20:

-Weekly check-in (Ruby or wellness role).

- Fortnightly (every 2 weeks) PT/exercise progression from Rachel.
- Fortnightly medical touchpoint for labs/symptoms (Dr. Warren via Ruby).
- Monthly consolidated report (Advik + Carla + Rachel + Ruby).
- Quarterly diagnostics at Month 0 (baseline), Month 3, Month 6 (details in §4).
- QBR-style reviews led by Neel at the end of Months 3 and 6.

- Travel rule: At least 1 full travel week every 4 weeks (choose from UK/US/South Korea/Jakarta). Adjust time zone in timestamps, exercise substitutions (hotel-friendly), meal guidance, jet-lag protocol, and scheduling via Sarah.
- Member-initiated volume: Up to ~5 new topics per week on average (curiosity, wearable anomalies, logistics, plan questions). Keep messages natural—some weeks fewer, some more.
- Adherence rule: Rohan follows the plan ~50% of the time. If adherence issues occur, Elyx adapts: simplify, change modality/time, align with travel, or negotiate alternatives.
`;

export const TASK_DESCRIPTION = `
Generate communication messages over 8 months from member sign up.
- The conversation should be in a Whatsapp style.
- 1 full diagnostic test panel every three months.
- Up to 5 conversations started by the member per week on average (curious questions, research).
- The member commits 5 hours per week on average to the plan.
- Exercises are updated every 2 weeks based on progress.
- The member travels for at least 1 week out of every 4 on business trips.
- Residence is Singapore.
- When generating reports, use text messages highlighting problem areas or progress.
- Member sticks to the plan ~50% of the time, so plans need to be changed or improved based on preferences/logistics.
- The member is generally not sick, but has 1 chronic condition to manage (e.g., high blood pressure).
- Generate realistic, human-like conversations that reflect the member's journey, including initial setup, challenges, frustrations, successes, and proactive health management.
`;

export const conversation_domain_to_cover = `
-General queries (e.g., restaurant picks, scheduling, friction removal).
-Wearables and sleep/recovery trends (Garmin HR, HRV, sleep stages; optionally propose Oura/Whoop upgrade if justified).
-Blood markers & biomarker education, interpretation, and follow-ups.
-Exercise & mobility programming (progress every 2 weeks; substitutions on travel).
-Nutrition & supplements (rationale, tolerability, logistics, cultural fit).
-Weekly Elyx report (bullet summary + next actions).
-Plan updates & intervention changes, plus short “why”.
`

export const quaterly_test =`
- Schedule and complete full panels at:
  Month 0 (baseline), Month 3, Month 6 within the 8-month window.
  Ruby coordinates phlebotomy/slots; Dr. Warren owns interpretation; share categorized results (<act>/<soft follow up>/<note>) and update plan.
  Panel scope (adapt male, 46y; select & justify key items each round):

-General health: Clinical history, physical exam, vitals (BP, HR), BMI/anthropometry.
-Bloods (core + advanced): OGTT + paired insulin; lipid profile + ApoB/ApoA, Lp(a), PLAC; FBC; LFT/KFT; micronutrient panel (incl. Omega-3); ESR/CRP (hs-CRP acceptable); biological age (e.g., TruAge/epigenetic age); thyroid (TSH/T3/T4); cortisol; sex hormones (age-adjusted); heavy metals (Pb/Hg as indicated); ApoE4 (if consent).
Urinalysis.
-Cancer screening (as indicated by age/sex): e.g., FIT (annual); colonoscopy cadence; MRI screening if warranted.
-Advanced cardiovascular: ECG; consider CAC/CCTA; echocardiogram as indicated; CIMT.
-Overall fitness: VO₂max; grip strength; FMS; spirometry; indirect calorimetry (where feasible).
-Genetics: Hereditary risk, pharmacogenomics (if consent).
-Body composition: DEXA.
-Hormone profiling: Thyroid/sex hormones (already above).
-Nutrition assessment: micronutrients, allergies/sensitivities, gut microbiome (if appropriate).
-Brain health: cognitive tests; stress/mood screen; brain MRI if indicated.
-Skin analysis (VISIA) and extended specialty consults as needed.

The agent must: (a) schedule these at M0/M3/M6, (b) report summaries, (c) log decisions + “why”, (d) modify plans accordingly.
`
export const HARD_CONSTRAINTS =`
1. Tri-monthly full diagnostics at M0, M3, M6 (see §4).
2. Member-initiated topics: ~5/week on average.
3. The time between two communication should not be very long. Strictly have 4-5 member initiated topics every week.
3. Exercise updated every 2 weeks (Rachel).
4. Travel: ≥1 week out of every 4; adjust logistics and plans.
5. Plan adherence ~50% → adapt plan/logistics accordingly.
6. Member not acutely ill; allow one manageable chronic condition.
7. Residence Singapore; primary timezone Asia/Singapore; shift when traveling.
8. Time budget: ~5 hrs/week average.
9.Weekly Elyx summary + next actions.
10. Safety & scope: No diagnosis or prescriptions in chat; clinical decisions only via Dr. Warren; emergencies are out-of-scope (simulate escalation only).
`

export const GUARD_RAILS=`
DO

-Use short, purposeful messages; cite concrete numbers/dates.
- Strictly have 4-5 member initiated topics every week.
- The communication should not be left idle for longer nummber of days.
-Adjust for time zones when traveling; involve Sarah for calendars.
-For any med-adjacent item, route through Dr. Warren with clear “why”.
-Close loops (confirmations, reminders, delivered items).
-Emit weekly summaries and quarterly recaps.

DON'T

-Don't provide diagnoses or prescribe meds in chat.
-Don't contradict previous numbers; keep a consistent internal state.
-Don't exceed the member-initiated topic cap on average.
-Don't skip the M0/M3/M6 full panels.
`