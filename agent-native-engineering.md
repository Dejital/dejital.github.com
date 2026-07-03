---
layout: main
title: Agent-Native Engineering
kicker: The definition
permalink: '/agent-native-engineering/'
description: >-
  Agent-native engineering, defined: shipping software by operating fleets of
  AI agents through a full lifecycle (idea, research, plan, implement, ship)
  with verification at every phase.
---

Agent-native engineering is the practice of shipping production software by
operating a fleet of AI agents instead of writing the code yourself. The
engineer's primary output shifts from diffs to directed work: every piece of
work moves through the full development lifecycle (idea, research, plan,
implement, ship), each phase with its own deterministic machinery rather than
one generic check at the end. An idea is ephemeral, a backlog item you grow,
merge, or throw away; research is the pass over the code you always make
before anyone writes a line; a plan is concrete and reviewable; implementation
is gated. What's left for the engineer is the creative end: deciding what to
build and why, judging whether the plan is right and whether the result
actually works, and keeping the fleet on the rails as the work rides that
conveyor belt.

I work this way daily: on production code at Meta, and on my own
infrastructure, where an autobuilder drains my personal project roadmap
overnight. This page is the definition. The essays linked below are the
mechanics, receipts, and failure stories.

### The unit of work is the lifecycle, not the diff

You do not hand an agent a prompt and hope. You hand it a claim on a queue
item that already carries research and a plan, and you take back a verified
change with the commit recorded against it. The diff is a byproduct. The
thing you delegate, track, and review is the whole lifecycle of one task.

### Verification is the core craft

Done is not a feeling. In an agent-native system, finishing a task
mechanically runs a gauntlet: build, tests, deploy, health checks against the
running service, then an acceptance check written before the work started.
An agent never gets to declare its own work correct. The gates do. Most of
the craft in this discipline is designing gates that catch what matters.

### Parallelism replaces typing speed

One engineer's ceiling used to be how fast they could think and type in a
single editor. A fleet runs many tasks at once, in isolated worktrees,
around the clock. The new ceiling is how much verified work you can specify
and review, and that is a different skill with different failure modes.

### Judgment moves upstream

Correcting a plan costs a sentence. Correcting a diff costs a review cycle.
Correcting production costs a weekend. Agent-native engineers spend attention
at the top of that gradient: they kill bad ideas at the queue, read every
plan, and read diffs in proportion to blast radius. Attention is the scarce
resource, so it goes where the failure modes are expensive.

### What it is not

It is not AI replacing engineers. The judgment load goes up, not down.
Someone has to decide what should exist, catch the plan that is subtly wrong,
and know what never gets delegated: ambiguous product calls, irreversible
migrations, anything security-sensitive.

It is not autocomplete rebranded. Autocomplete accelerates typing inside the
old workflow, and typing was never the bottleneck. Autocomplete makes an
engineer maybe 5% faster. Agent fleets multiply what a team ships, because
they take over the phases where the time actually goes.

And it is not shipping unreviewed AI code. Volume of unreviewed code is not
productivity; it is deferred incident response. The discipline exists
precisely because verification, not generation, is the hard part.

### Read the essays

The deep dive on the whole system, and the right place to start:

- **I run a fleet of AI agents that ships production software**
  (coming soon: the flagship essay)

Coming next in the series (this page will link each as it ships):

- The five phases: why agents need a lifecycle, not a prompt
- What my agent fleet actually costs per shipped PR
- What my day feels like when agents do the typing
- Anatomy of my harness: instruction files, skills, hooks, and gates
- My fleet benchmarked the new model while I slept
- One ticket, five agents: a real decomposition, start to finish
- Review is the new bottleneck (and the trust pipeline that fixes it)
- Parallel agents without chaos: worktrees, fan-out, and when not to

*Views my own; not speaking for my employer.*

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "Agent-Native Engineering",
  "description": "Agent-native engineering is the practice of shipping production software by operating a fleet of AI agents instead of writing the code yourself. The engineer's primary output shifts from diffs to directed work: every piece of work moves through the full development lifecycle (idea, research, plan, implement, ship), each phase with its own deterministic machinery rather than one generic check at the end.",
  "url": "https://snevsky.com/agent-native-engineering/"
}
</script>
