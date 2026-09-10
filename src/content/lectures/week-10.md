---
title: "The Correct Build Should Change Mid-Game"
description: "Re-evaluation, abandoned plans and the cost of sunk-cost thinking"
week: 10
date: 2026-10-06
teachers:
  - spike
claim: "Consistency with an earlier plan becomes a fault once the information it rested on has changed."
constraints:
  - no-recall
---

Week 5 was about choosing with almost no information. This week is about what
happens when the information arrives.

The interesting problem is not *what should I change to* — that is week 5's
question asked again, with better inputs, and most players can answer it if
prompted. The problem is that **they are not prompted**. Nothing in the game
interrupts to say the plan has expired. The build keeps completing itself,
item by item, on assumptions that stopped being true several minutes ago.

So this week is about detection.

## Why revision does not happen

Three reasons, in ascending order of how much they explain.

**Nobody is checking.** The build was decided once and became a queue.
Purchases are executed from the queue whenever gold allows, which under the
no-recall constraint is at respawn, which is exactly the moment a player is
least inclined to re-analyse anything.

**Revision costs gold already spent.** Selling is lossy. Pivoting means the
components in your inventory were partly wasted, and that feels like an
admission. It is an admission. It is also cheaper than the alternative.

**The plan was never written down**, so there is nothing to notice the
expiry of. A player who cannot state the assumption their build rests on
cannot detect that it has failed. This is the real cause, and the other two
are symptoms.

## Triggers

The practical content of the week is a short list of observable events, each
of which should cause a re-read rather than a specific purchase.

| trigger | what it invalidates |
| --- | --- |
| an enemy buys a resistance item | that your damage still scales the way you assumed |
| an enemy buys anti-heal | your team's sustain plan, immediately |
| a threat emerges from a champion you had discounted | your priority target, and where you stand |
| an enemy augment or item changes their range or mobility | whether you are actually safe where you are |
| your team's frontline is dying first, repeatedly | who the fight is actually being fought around |
| you stopped being able to kill somebody you used to kill | the whole build, usually |

None of these prescribes an item. Each says *the model you have been operating
is now known to be wrong in a specific way*. What to do about it is week 5's
procedure, run again with the new evidence.

## A case

You are **Miss Fortune** on a team of Miss Fortune, Orianna, Amumu, Thresh,
Darius, against Rammus, Leona, Vex, Twitch and Anivia.

Early on the read was straightforward: their front is durable but their back
is not, the team has enough setup to open a fight, and your job is damage into
whatever the setup catches.

By the middle of the game two things have happened. Rammus and Leona have both
bought armour, and their Vex has begun reaching your position rather than
Orianna's. Neither event is announced. Both invalidate a different part of the
plan — the first says your damage no longer converts against the people you
have to shoot through, the second says the safe distance you have been
standing at is no longer safe.

A player who does not check will continue completing a build that answers a
question the game stopped asking, and will describe the result afterwards as
their team not following up.

## Sunk cost, precisely

The components already bought are gone whether you pivot or not. They cannot
be recovered by continuing to build toward them; that only spends more gold in
the same direction. The correct comparison is never *what have I already put
into this* but *of the gold I have not yet spent, what does the most work from
here*.

This is easy to state and genuinely hard to do, because the alternative
feels like admitting the earlier decision was bad. Usually it was not. It was
correct on the information available and has since been overtaken. Week 9's
distinction applies here too: a decision is judged against what was knowable
when it was made, and revising it later is not a confession.

## The counterargument

Constant revision is its own failure. A player who re-evaluates after every
death converges on nothing, buys components toward four different builds, and
finishes with an inventory that is good against everything and sufficient
against nothing. Under the no-recall constraint, thrashing is expensive.

The resolution is that revision should be **triggered, not continuous**. The
list above is short on purpose. If none of those has happened, the plan stands
and the queue is fine. Discipline here is knowing which events deserve a
re-read, not re-reading constantly.

## Takeaway

Write the assumption down, even if only to yourself, so there is something
capable of being falsified. A plan you cannot state is a plan you cannot
notice the death of.
