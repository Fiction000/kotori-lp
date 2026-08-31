# Kotori work-page agent suite

Run the project agents sequentially:

1. `work-page-researcher` verifies the entity and produces a `READY` evidence packet.
2. `work-page-writer` drafts only from that packet.
3. `work-page-reviewer` issues publication and indexation decisions.

The parent agent alone edits Astro files. Send fixes to the named upstream role, rerun review after implementation, and publish only after `APPROVE` and `INDEX`.

These project-scoped definitions follow the official custom-agent format:
https://developers.openai.com/codex/agent-configuration/subagents
