# FlightCheck - TAMUHack 2020
Through personal traveling experiences, we realized that packing for traveling can be a stressful process. A lot of times, we overlook small items that could make a big difference when we're away from home. For those that don't travel often, this can be a stressful part of the traveling process that may discourage some from traveling more frequently. We wanted to alleviate this process by building a mobile app that helps the users plan out what items to bring as well as giving recommendations based on their flight data.

## What it does
The mobile app provides a packing list for the user who's about to depart for a flight. The user has a default list with travel essentials. When the user inputs their flight data, relevant recommendations for additional items to bring are given. In addition, the user can manually add items based on their needs by either typing or scanning the items with their phones.

## How we built it
We used Swift for the front-end. As for the item detection, we integrated Apple's Vision framework, alongside with the Core ML model (Resnes50). We used JavaScript for the back-end and for interacting with the Flight Engine API.

## Challenges we ran into
This is the first time we used Swift as well as incorporating an ML model, so it was a bit of a learning curve. Getting JavaScript and Swift to interact with each other and the external APIs was also a challenge.

## Accomplishments that we're proud of
Being able to put together a mobile app in Swift. 

## What's next for FlightCheck
Improving the UI/UX. Having more functionalities for the users to interact with the camera (i.e having more information displayed once the items are scanned, etc.). Improving the recommendation system by strengthening the relationship between the flight data and the items inputted.
