# Security and Anti-Cheating Guide

This document describes the controls implemented in this project for the IPL Auction quiz. It focuses on on-device digital cheating and explains the limits so expectations are clear for desktop and mobile users.

## What Is Enforced On The Server

- The question API returns only the question text and options. Correct answers are stored only on the server.
- Scoring is computed on the server during submission. The client cannot send a score.
- The quiz start time is created once on the server per team and reused on reloads. Refreshing does not reset the start time.
- Each team has a session token. When a team logs in again, the server rotates the token and the older session becomes invalid.

## What Is Enforced In The Client

- A five-minute countdown runs in the browser but is anchored to the server start time. The quiz auto-submits when the timer reaches zero.
- Tab switching or losing focus is detected. The first two violations show warnings. The third is a final warning. The next violation triggers auto-submit.
- Back navigation is blocked during the quiz to reduce accidental exits.
- Copy, right-click, and text selection are disabled inside the quiz view to make casual copy/paste harder.
- Question order is shuffled once and saved in local storage. Reloads restore the same order and the same current question.
- Answers are saved to local storage as the user selects options so a reload does not allow a reset.
- A heartbeat runs roughly every 15 to 20 seconds. If another device logs in with the same team, the earlier device is logged out.

## Mobile Behavior

- Switching apps, opening the app switcher, or backgrounding the browser can trigger the same focus and visibility checks as tab switching.
- Incoming calls or notification overlays may count as a focus change and consume a warning.
- Long-press selection and copy actions are blocked in the quiz container where the browser respects selection settings.

## Examples

1. A user opens WhatsApp during the quiz and returns. They receive a warning. After three warnings, the next app switch auto-submits the quiz.
2. A user refreshes the page on question 4. The timer resumes based on the original server start time and the same question order is restored.
3. A user logs in on a second phone. Within about 15 to 20 seconds the first phone is logged out because the session token has rotated.

## Known Limitations

- The server does not currently reject late submissions. The timer is enforced by the client, so a modified client could bypass it.
- There is no way to detect a second device that is not logged in (for example, someone searching answers on another phone).
- Physical collaboration in the same room cannot be detected without in-person proctoring.
- Screen sharing, casting, photos, or screenshots are not blocked.
- Clearing local storage or registering a new team name can reset the local question order and answers.
- The admin dashboard uses a client-side password prompt. It should only be used on trusted admin devices.

## Operational Notes

- Use a single device and keep the quiz in the foreground for the full five minutes.
- Turn on Do Not Disturb on mobile to avoid accidental focus changes.
- If a device crashes or reloads, re-open the quiz quickly. Your progress and order will be restored on that device.
