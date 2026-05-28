import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Calendar setup",
  description:
    "Connect Google Calendar or Microsoft Calendar so Nexus can auto-start at meeting time. Read-only; Nexus never modifies your events.",
};

export default function Page() {
  return (
    <Prose>
      <h1>Calendar setup</h1>
      <p>
        Connect a calendar so Nexus can offer to auto-start recording when a
        meeting begins. Calendar access is read-only, OAuth-based, and never
        leaves your device.
      </p>

      <h2>Google Calendar</h2>
      <ol>
        <li>
          Open <em>Settings → Calendar</em> and click <em>Connect Google</em>.
        </li>
        <li>
          A browser window opens. Sign in to the Google account whose
          calendar you want to use, and approve the{" "}
          <strong>read-only calendar</strong> scope.
        </li>
        <li>
          You&rsquo;ll be returned to Nexus with a green{" "}
          <em>Connected</em> indicator.
        </li>
      </ol>

      <h2>Microsoft Calendar (Outlook / Microsoft 365)</h2>
      <ol>
        <li>
          Open <em>Settings → Calendar</em> and click <em>Connect Microsoft</em>.
        </li>
        <li>
          Sign in with your Microsoft account in the browser and approve the
          read-only calendar scope.
        </li>
        <li>You&rsquo;ll be returned to Nexus.</li>
      </ol>

      <h2>Auto-start behavior</h2>
      <p>
        When a meeting on your connected calendar is about to start, Nexus
        pops up a small prompt asking if you want to start recording. Approve
        once and recording begins immediately with the meeting&rsquo;s title
        pre-filled.
      </p>
      <p>
        You can disable auto-start in <em>Settings → Calendar → Auto-start</em>.
        Even with auto-start off, the Agenda panel will still surface your
        upcoming meetings.
      </p>

      <h2>What Nexus does and doesn&rsquo;t see</h2>
      <ul>
        <li>
          <strong>Sees</strong>: event title, start/end time, your free/busy
          status, the connected calendar&rsquo;s account email.
        </li>
        <li>
          <strong>Does not see</strong>: event descriptions, attendee lists,
          meeting links, attachments — none of these are requested.
        </li>
        <li>
          <strong>Never writes</strong>: Nexus has read-only scopes. It
          cannot create, modify, or delete events.
        </li>
      </ul>

      <h2>Disconnecting</h2>
      <p>
        Open <em>Settings → Calendar</em> and click <em>Disconnect</em>. The
        OAuth refresh token is wiped from local storage immediately, and you
        can independently revoke the grant from your Google / Microsoft
        account security settings.
      </p>
    </Prose>
  );
}
