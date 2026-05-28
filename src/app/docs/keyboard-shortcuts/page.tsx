import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Keyboard shortcuts",
  description:
    "Every action in Nexus has a keyboard path. The command palette (Ctrl+K) is the central hub.",
};

const groups: { name: string; rows: [string, string][] }[] = [
  {
    name: "Global",
    rows: [
      ["Ctrl+K", "Open command palette"],
      ["Ctrl+N", "New meeting"],
      ["Ctrl+,", "Open Settings"],
      ["Ctrl+B", "Toggle sidebar"],
      ["Ctrl+/", "Show keyboard shortcuts"],
      ["Ctrl+Shift+L", "Cycle theme (light → dark → system)"],
    ],
  },
  {
    name: "Inside a meeting",
    rows: [
      ["Ctrl+R", "Start / stop recording"],
      ["Ctrl+E", "Re-enhance notes"],
      ["Ctrl+T", "Open transcript pane"],
      ["Ctrl+M", "Open chat pane"],
      ["Ctrl+Shift+E", "Export meeting"],
    ],
  },
  {
    name: "Editor",
    rows: [
      ["Ctrl+B", "Bold"],
      ["Ctrl+I", "Italic"],
      ["Ctrl+Shift+1/2/3", "Heading levels 1 / 2 / 3"],
      ["Ctrl+Shift+8", "Bullet list"],
      ["Ctrl+Shift+9", "Numbered list"],
      ["Ctrl+[ / Ctrl+]", "Outdent / indent"],
    ],
  },
];

export const metadata2 = undefined;

export default function Page() {
  return (
    <Prose>
      <h1>Keyboard shortcuts</h1>
      <p>
        Nexus is keyboard-first. Every action lives in the command palette
        (Ctrl+K). The shortcuts below are the most common ones.
      </p>
      {groups.map((g) => (
        <section key={g.name}>
          <h2>{g.name}</h2>
          <table className="w-full table-fixed text-sm">
            <tbody>
              {g.rows.map(([k, v]) => (
                <tr key={k} className="border-b last:border-b-0">
                  <td className="w-48 py-2 align-top font-mono text-xs">
                    {k}
                  </td>
                  <td className="py-2 align-top text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
      <p>
        Open the command palette to discover the rest — it shows the shortcut
        next to every action that has one.
      </p>
    </Prose>
  );
}
