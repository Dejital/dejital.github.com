---
layout: post
title: Building a Newborn Simulator
---

The mechanics of caring for a newborn child are surprising and fascinating.
It's both challenging and simple at the same time.
And it's not like any other experience in my life.

This inspired me to build a [Newborn Simulator](https://snevsky.com/newborn-simulator/) over paternity leave.

<aside>{% include image.html img="/assets/img/newborn-simulator-01.png" title="Screenshot from Newborn Simulator by Serge Nevsky" %}</aside>

I figured it would be a fun challenge to work on a project in the short bursts of free time I had between feedings, diapers and sleep.
The idea was to create a simple user interface consisting of buttons that give the "player" feedback about a simulated newborn's condition.
The aim of the "game" is to keep the newborn satisfied, fed and clean. 

### The Technology

For rapid interactive front end development `create-react-app` remains one of the best ways to get started.
I feel comfortable using React and this set of scripts served me well before.
Sometimes the best technology is the one you know best, particularly for short term projects such as this one.

It was my first time using the `gh-pages` package along with `create-react-app` but it made deploying the app an absolute breeze.
I also used `semantic-ui` for UI components and styling, which is a killer time saver for a developer.

### The Game 

The user interface is split into three columns. 
The first column displays the baby's condition and metrics, as well as the player's stamina.
The next column is a list of actions the player can take. 
And the final column displays game statistics. 

The baby's condition or "feeling" is equivalent to health points in classic gaming terms.
If feeling drops too low, the game is over.

Similarly the player's stamina is almost like magic points, since taking actions "uses it up".
It recovers when the player takes rest. 
If you neglect your stamina, you will pass out from exhaustion. 

The baby's weight grows as the player progresses through juggling the various actions.
The weight can also drop upon neglect. As such, weight is essentially the game score.

Finally the baby's age is the in game clock. 
It doesn't run out, but it does allow you to compare the rate of weight gain in different play throughs.
This is intended to motivate the player to replay the game again and do better.

Ultimately this is a game of balancing your responsibilities towards the child and your own health.
Not so different than raising a baby.

[Try playing the Newborn Simulator here.](https://snevsky.com/newborn-simulator/)

