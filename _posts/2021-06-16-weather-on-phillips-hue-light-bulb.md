---
layout: post
title: Checking the Weather with Phillips Hue Light Bulbs
---

Working from home during the pandemic created opportunities for short walks throughout the day. With a baby, this is all the more tempting. Unfortunately the weather in Kansas is neither cooperative nor consistent. This means frequent lookups of current weather conditions.

Sometimes that means opening the Weather app on my iPhone. Sometimes it's Google Assistant. And other times it's opening the front door and peeking my head out.

But each of these actions carries friction. To eliminate that friction I built a service to set my Phillips Hue light bulb color based on the current weather conditions.

<aside>{% include image.html img="/assets/img/paris-painting-hue-light-bulb-1.jpg" title="Painting of Paris lit by blue Phillips Hue light bulb" %}</aside>

An oil painting of Paris sits above our fireplace, lit by overhead spotlights. I replaced these spotlights with two color Phillips Hue light bulbs. The idea was to color the Parisian sky based on the weather conditions. The painting itself stays static, but the color of the bulbs gives an illusion of rain, snow, clear or cloudy skies.

For the implementation in Python, I used a combination of:

• The Phillips Hue API, via the `phue` library <br />
• The Open Weather Map API, via `pyowm` 

The inspiration for this combination of libraries came from [friedmud/hue_weather](https://github.com/friedmud/hue_weather) which is the closest thing to what I was looking for. Similarly to the author, I found the IFTTT offerings extremely limited. Luckily these APIs are extremely approachable, and I had a working prototype after just two hours of coding.

## Hue API

The Hue API is extremely easy to use thanks to the [phue library](https://github.com/studioimaginaire/phue). You must authenticate your Hue Bridge to generate a credentials file. That means pushing the physical button on the device once, then immediately executing the `bridge.connect()` function. Once the credentials file exist, it need not be renewed. [See details in their documentation.](https://github.com/studioimaginaire/phue#examples)

Adjusting colors has many options, such as changing on/off, brightness, hue and various other properties individually. I found the easiest way to set colors was to do it manually in the iPhone app, then using the API to fetch the `xy` "coordinates" for that color. I noted those colors down, then set just the `xy` property on the light bulbs based on the weather condition.

## Open Weather Map API

For my use case, 15 mins between forecast checks (all day, so long as the light bulbs are turned on), is well within the boundaries of Open Weather Map's free tier.

Accessing this API with the pyowm library was slightly confusing. My API key returned strange errors when using many of the library's functions. It may be that some functions are limited by the pricing tier. Admittedly this was not clear in the documentation.

However I found that the `weather_manager.one_call()` function *did* work as expected and  met my use case. [See the documentation for "OneCall data" here](https://pyowm.readthedocs.io/en/latest/v3/code-recipes.html#onecall). I pass it the longitude and latitude for my location, and it returns a whole heck of a lot of information.

I was impressed with the API's decision to use status codes to indicate weather conditions. I know very little about weather forecasting so I'm not sure if they are standard or not. They are conveniently similar to HTTP status codes. For instance 500 level status codes indicate various levels of rain, while 600 level status codes indicate snow. [See the documentation for those codes here.](https://openweathermap.org/weather-conditions)

Ultimately my implementation relies on the status codes entirely to display "rain" colors, "snow" colors, etc. I struggled with choosing distinct colors to indicate "cloudy", "drizzle" or "clear". Off white can't mean everything. But I settled on some combinations that I could remember. For "clear" skies I also colored one of the bulbs warmer or cooler (more red or more blue) based on the current temperature.

## Docker

I've found that the easiest way for me to deploy services to my home server from my laptop is using Docker containers. It's definitely possible to set up a daemon, but personally I'm more comfortable with Docker.

The Dockerfile installs `python3` and `pip` , then feeds the `requirements.txt` file to `pip` (which is the standard Python package manager). This is my preferred pattern for combining small Python services with Docker.

My home server runs this container continuously. There is a 15 minute wait between executions of the business logic within the code. It's also quite fun to test, since I'm programming something in the physical world for once.

## Outcome

It works! The service has been running for a few days now without issue. Since the weather has been clear for these last few days, I've only seen the bulb indicating heat turning increasingly red as the day progresses. Sometimes it stays red way after dark. I should raise the threshold for red, since it makes Paris look like an erupting volcano.

<aside>{% include image.html img="/assets/img/paris-painting-hue-light-bulb-2.jpg" title="Painting of Paris lit by red Phillips Hue light bulb" %}</aside>

I'm satisfied with both of these APIs. It took very little time to set it up. As described earlier, this took about two hours total. The majority of that time was spent choosing colors to indicate the weather. That's a good thing.

Given just how simple it was to spin this up, I'm tempted to jump further into home automation programming. It's neat to program something that can be demoed to house guests.

[See the source code on Github here.](https://github.com/Dejital/hueweather)

## Taking it further

The code is currently is far too specific to my house. It targets two light bulbs, intending to light a painting of Paris above a fireplace. That doesn't have to be the case. Add a few more configuration options and this could be usable by others. At this point I'm happy if it inspires someone to try these APIs out themselves, using my code as a working example.

Additionally I'm still not really that pleased with the color combinations. I struggled to come up with colors that indicated weather in an intuitive way. One possibility is color coding them more explicitly. There's no reason the sky in Paris would ever turn green, so I did not use it. But if it can indicate something useful and distinct, such as a flash flood warning, then it makes sense.

Finally, there are opportunities for similar projects. I have many other (non-weather indicating) Hue bulbs throughout the house. It would be convenient to change to warmer tones as sunset nears, similar to how f.lux works on the computer.
