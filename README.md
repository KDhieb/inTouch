# inTouch - TreeHacks 2021 Submission
## A social media proof of concept made to take the hassle out of keeping in touch.

## What it does

inTouch is a social media platform that allows users to find common free availlabilities among their friends. The features include:
- Importing your Google Calendar events to your account
- Creating "Free" timeblocks in our scheduler to mark all your future availlabilities, and set your event preferences (virtual, in person, or both)
- Seting your personal interests on your profile page (example: tennis, restaurants, running, etc.)
- Adding your friends, and our platform will find all overlapping free timeblocks of friends that match yours based on similar event preferences
- Clicking on multiple friends to view common group availlabilities
- Sending Google Calendar invites to all selected friends (our site will also suggest events based on your interests!)

## How we built it

inTouch is built with a serverless architecture using React. Our application authentication is handled using Google's Firebase identity and authentication APIs. Our database is hosted on Firebase realtime database, and we have a separate node.js API server for calculating optimal touchables™. When such an event is found, we use Google calendar APIs in order to create a meeting and invite the other participants.

## Is the site live?
Not yet. Currently, our app is only authorized to access Google Calendar data from registered testers and admin. However, you are free to use the code yourself while using your own personal API keys (From Firebase and Google). Just make sure to properly set them up as environment variables.

## Gallery

## Schedule dashboard
![intouch3](https://user-images.githubusercontent.com/47509883/108675231-7fae5980-74b4-11eb-93db-8b0367ba174b.png)

## Add free timeblock
![intouch1](https://user-images.githubusercontent.com/47509883/108675312-a10f4580-74b4-11eb-84db-9e1f05a8c203.png)

## Friends page
![intouch2](https://user-images.githubusercontent.com/47509883/108675351-b1272500-74b4-11eb-8311-3d2f0bcda7fc.png)

## Profile page
![intouch 4](https://user-images.githubusercontent.com/47509883/108675402-c2703180-74b4-11eb-8e89-756705548d88.png)







