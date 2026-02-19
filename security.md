# Security and Anti-Cheating Guide (Plain Language)

This page explains, in simple terms, what the system checks and what user actions can cause problems during the IPL Auction quiz.

## What The Server Enforces

- The server keeps the correct answers. The app never receives them.
- The score is calculated on the server when you submit. The app cannot send a score.
- The quiz start time is saved once per team. Refreshing does not reset the timer.
- Each team gets a session token. If the same team logs in again, the old session is kicked out.

## What The App Enforces

- A 5-minute countdown runs in the browser, but the time is based on the server start time.
- Back navigation is blocked during the quiz to reduce accidental exits.
- Copy, right-click, and text selection are disabled inside the quiz view.
- Question order is shuffled once and stored locally so it does not reset on refresh.
- Answers are saved locally as you click options so progress is restored after a reload.
- A heartbeat runs every ~15 to 20 seconds to check for another device using the same team.

## Actions That Can Cause Trouble (With Examples)

- **Logging in on a second device:** The first device will be logged out within about 15 to 20 seconds.
  Example: You open the quiz on your phone, then also log in on a laptop. The phone session gets kicked out.

- **Using Back/Forward in the browser:** The app blocks it and shows a warning.
  Example: You tap the back button to check the registration page. The quiz blocks the navigation.

- **Refreshing the page:** Your answers and question order return, but the timer does not reset.
  Example: You refresh on question 4. The same question order loads, but you have less time left.

- **Leaving the quiz for a long time:** Time keeps running on the server even if you are away.
  Example: You switch apps for 3 minutes. When you return, the remaining time is 3 minutes less.

- **Clearing site data or local storage:** Your saved answers and position are erased.
  Example: You clear browser data or use a private window. Your quiz state is lost.

- **Poor or lost internet during submission:** The app saves an offline copy and shows an error.
  Example: Your network drops when you submit. The app stores your answers locally and asks you to take a photo.

## What Is NOT Enforced

- There are **no tab-switch warnings** or auto-submissions for changing tabs.
- The system cannot detect if you use another device to search for answers.
- Screen recording, screenshots, or photos are not blocked.
- In-person collaboration cannot be detected without a proctor.

## Quick Tips For Users

- Use one device only.
- Keep the quiz open to avoid losing time.
- Avoid refreshing unless you must.
- Make sure your internet is stable before you submit.
