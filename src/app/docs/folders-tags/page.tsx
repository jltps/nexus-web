import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Folders & tags",
  description:
    "Organize meetings with nested folders and flat tags. Both also work as scopes for cross-meeting chat.",
};

export default function Page() {
  return (
    <Prose>
      <h1>Folders &amp; tags</h1>
      <p>
        Nexus gives you two organizational tools that work together. Folders
        for hierarchy (clients, projects), tags for cross-cutting attributes
        (priority, topic, person). Both work as scopes for{" "}
        <a href="/docs/chat">cross-meeting chat</a>.
      </p>

      <h2>Folders</h2>
      <ul>
        <li>
          <strong>Nested:</strong> you can have arbitrarily deep folder trees.
          Most people stop at two levels (Client → Project).
        </li>
        <li>
          <strong>Drag &amp; drop:</strong> re-organize from the sidebar.
        </li>
        <li>
          <strong>One folder per meeting:</strong> meetings live in exactly one
          place.
        </li>
      </ul>

      <h2>Tags</h2>
      <ul>
        <li>
          <strong>Free-form:</strong> type a new tag and it&rsquo;s created.
        </li>
        <li>
          <strong>Many per meeting:</strong> stack tags for retrieval.
        </li>
        <li>
          <strong>Bulk re-tag:</strong> select multiple meetings in the
          sidebar and apply tags in one action.
        </li>
      </ul>

      <h2>Filtering</h2>
      <p>
        The sidebar filters work additively — pick a folder <em>and</em> a
        tag to narrow further. Clear filters from the top of the meeting
        list.
      </p>

      <h2>Scoping cross-meeting chat</h2>
      <p>
        When you open the cross-meeting chat panel, the folder and tag
        filters carry over as the chat scope. You can also adjust the scope
        from the chat panel itself.
      </p>

      <h2>Search</h2>
      <p>
        Folders/tags compose with full-text search. Search returns hits across
        transcripts and notes, scoped by whatever filters are active.
      </p>
    </Prose>
  );
}
