# DestinationHunt

## Description: 

A website for exploring different places. Authentication is done at the website. Without an account, users can view all venues, view events, ratings and reviews, travel information for venues, and use filtering and sorting features as needed. The venue displays location on a map with style options. After creating an account, you can add your own venues, update or delete existing venues, add events to venues, rate and review different venues, and set event reminders.

## Technologies:

Node JS, Express JS, HTML, CSS, Bootstrap, EJS, jQuery, MongoDB, Cloudinary For Images, Mapbox For Maps

## Website Link:

https://serene-sands-21199.herokuapp.com

## Features:

### 1] HOME -
This is the home page of the website. It has navigation bar containing links 
to links to Venue(Index) Page, Login Page and Register Page. It also has a small 
description about the website and the footer.

![Screenshot (1016)](https://user-images.githubusercontent.com/91789120/203686712-98a799ec-e86c-452f-afb1-0f7dcf9ebfb9.png)

### 2] USER -

#### 2.1] REGISTER -
This is the register page of the website. It has the register form which have 
Username text input, Email text input and Password text input. All three inputs are 
required. Username and Email should be unique. Form Validation is also applied. 
It has the link to Login Page if you have already registered.

![Screenshot (1020)](https://user-images.githubusercontent.com/91789120/203686852-c5ae1a2a-7c99-4ebb-b7dd-67b1bfe12c47.png)

#### 2.2] LOGIN -
This is the login page of the website. It has the login form which have 
Username text input and Password text input. Both inputs are required. Username 
and Password should match with user credentials stored in collection in order to 
login. Form Validation is also applied. It has the link to Register Page if you haven’t 
already registered.

![Screenshot (1019)](https://user-images.githubusercontent.com/91789120/203686870-14f97b2b-888f-48a8-91b2-83e9fe580528.png)

#### 2.3] PROFILE -
This is the profile page of the website. It displays the information about the 
user like username, email, joining date. Also, it displays the venues posted by that 
user and the link to that venue.

![Screenshot (1045)](https://user-images.githubusercontent.com/91789120/203687646-bdfa5e16-c5fb-4dcb-9e63-00ef5b34301e.png)

### 3] VENUE -

#### 3.1] INDEX -
This is the index page of venues of the website. It displays the add venue 
button and Filter-Sort button which opens respective UI. It also displays all the 
venues (Image and Title) available and it changes according to the filtering and 
sorting applied.

![Screenshot (1018)](https://user-images.githubusercontent.com/91789120/203686831-544d1df2-53bc-4985-9ac2-60a2a9362197.png)

#### 3.2] NEW -
This is the new page of venues of the website. It displays the new venue 
form containing inputs for all the necessary information required to create venue in 
collection. Category, Country, State and City are select inputs and the value can be 
selected from the given options. More than one images can be uploaded.

![Screenshot (1030)](https://user-images.githubusercontent.com/91789120/203687442-544a79fc-1c66-4cb0-902a-da2e0f35bfa4.png)

![Screenshot (1031)](https://user-images.githubusercontent.com/91789120/203687463-89f3fa0f-74f2-490d-8cf5-ed57c9741434.png)

#### 3.3] SHOW -
This is the show page of venue of the website. It displays the details of the 
particular venue. There is a carousel for more than one images. It also shows the 
average rating according to the number of reviews posted. It also displays other 
features like Review, Events, Map and Travel Info which are described in next 
topics.

![Screenshot (1021)](https://user-images.githubusercontent.com/91789120/203686911-4a873f27-aeab-4b0d-b17a-d9a2efbaef1e.png)

#### 3.4] REVIEW -

##### WITHOUT LOGIN -
This is the review section displayed inside show page of a venue in the 
website. Without login, users can only see reviews posted by other users.

![Screenshot (1022)](https://user-images.githubusercontent.com/91789120/203686928-b8ee3917-2e34-4e94-a8ac-879cda8110a1.png)

##### WITH LOGIN -
After logging in, User can share their own experience by posting the review 
with appropriate rating from 1 to 5 and describing their experience in text area. 
There is a link to profile page of author, rating, body and time of posting(in form 
of 1hr ago, etc.). User can delete his review if he is the author.

![Screenshot (1035)](https://user-images.githubusercontent.com/91789120/203687190-4e1526c2-7195-4e85-8be0-4ca1ff31a946.png)

#### 3.5] EDIT & DELETE -
User has the authority to edit or delete the venue only if he is the owner of 
the venue. Below figure shows the edit and delete button. Edit button renders edit 
Page and delete button directly deletes venue from collection.

![Screenshot (1032)](https://user-images.githubusercontent.com/91789120/203689375-012d64d1-56bc-476d-8188-4ea278a2570e.png)

This is the edit page.

![Screenshot (1033)](https://user-images.githubusercontent.com/91789120/203687479-4f8c351f-09ce-4c9b-b6ec-0f59c0261cd1.png)

![Screenshot (1034)](https://user-images.githubusercontent.com/91789120/203687507-de797b5b-7ef4-4330-90a9-ad5e4b9f2332.png)

### 4] EVENT -

#### 4.1] ADD EVENT MODAL -
Below figure shows modal with add event form where owner of the venue 
can add event on venue by describing title, description, date and time of the event.

![Screenshot (1023)](https://user-images.githubusercontent.com/91789120/203687938-23cee1a8-ccee-4e4a-a95e-dcfa764c59f0.png)

#### 4.2] SHOW EVENT MODAL -
Below figure shows modal with all events hosted on that venue. It has link to 
all events index page which show full information about the event. Owner can also 
delete that event. It shows these events by populating events field on venue object 
only.

![Screenshot (1024)](https://user-images.githubusercontent.com/91789120/203689777-2fa27b12-a53e-474b-87c0-835b5ddcf0a4.png)

#### 4.3] ALL EVENTS PAGE -
Below figure shows index page of events showing all of the events hosted on 
all the venues. It displays the title, description, venue’s address, date and time of 
the event. It displays events in sorted order of date and time

![Screenshot (1043)](https://user-images.githubusercontent.com/91789120/203687755-4acdba36-8707-4968-9221-b4360af3d056.png)

#### 4.4] EVENT REMINDER EMAIL -
As shown in above figure, if we click set reminder button then the event 
reminder email as shown in below figure is sent to the user by team destination hunt.

![Screenshot (1044)](https://user-images.githubusercontent.com/91789120/203687741-dc87b8bc-e0a7-4565-8c14-b2aa7d0166e0.png)

### 5] FILTER & SORT -
User can click on the Filter-Sort button on index page which opens the 
Filter-Sort Modal. There are different filtering options like title, category, country, 
state, city and radius(in km). User can come up with any combinations of these 
filters. There are different sorting options like title, rating and distance. User can 
provide filtering combinations and one sorting option together and get the resulted
list of venues below where all venues are shown. Below are some examples.

#### EXAMPLE-1

![Screenshot (1046)](https://user-images.githubusercontent.com/91789120/203690358-6df84fdd-9074-473a-81cd-de3517c71cf5.png)

![Screenshot (1047)](https://user-images.githubusercontent.com/91789120/203690426-ff538f6d-152f-4ee6-bae2-44286728b6c2.png)

#### EXAMPLE-2

![Screenshot (1048)](https://user-images.githubusercontent.com/91789120/203690434-ed84ae8a-4a96-48b0-a4f7-5750cb6db947.png)

![Screenshot (1049)](https://user-images.githubusercontent.com/91789120/203690439-7e013193-44d5-479f-a7f7-16ac1b70dd92.png)

#### EXAMPLE-3

![Screenshot (1050)](https://user-images.githubusercontent.com/91789120/203690448-de00c83e-12f2-43b3-ad47-5a7ab863c7d5.png)

![Screenshot (1051)](https://user-images.githubusercontent.com/91789120/203690452-42958ce2-e947-4fb2-92f5-9dc302f50716.png)

#### EXAMPLE-4

![Screenshot (1052)](https://user-images.githubusercontent.com/91789120/203690457-d27a2f9f-2f94-4aee-8357-7667ef55d24d.png)

![Screenshot (1053)](https://user-images.githubusercontent.com/91789120/203690461-8a60a3ab-dcd2-4a56-94c3-137fcb774219.png)

### 6] OTHER FEATURES -

#### 6.1] MAPS
User can see the location of the venue on the map displayed on the Map 
Modal on the show page of the website. There are five different types of map styles 
are available namely satellite, light, dark, streets and outdoors. User have different 
options on the map like zoom in, zoom out and reset bearing to the north.

##### SATELLITE -

![Screenshot (1026)](https://user-images.githubusercontent.com/91789120/203691101-e8b6a756-bf8a-4bf5-ab3a-679df1c48ae6.png)

##### LIGHT -

![Screenshot (1027)](https://user-images.githubusercontent.com/91789120/203691107-6c989324-3dc6-4cb7-bf3f-3ebe4ea03027.png)

##### DARK -

![Screenshot (1028)](https://user-images.githubusercontent.com/91789120/203691109-3bf701c1-a5b1-488f-b795-ee8f1c15eae9.png)

##### STREETS -

![Screenshot (1025)](https://user-images.githubusercontent.com/91789120/203691095-11fccbc4-aec9-47a9-9160-8fbbec05d2ca.png)

##### OUTDOORS -

![Screenshot (1029)](https://user-images.githubusercontent.com/91789120/203691113-7c279db6-0cb6-44ed-8c52-99021970bf74.png)

#### 6.2] TRAVEL INFO
Users can see the travelling options based on the distance of the user’s 
location to the venue on Travel Info Modal on the show page of the website. There 
is a table describing capacity and prices(per km) according to distance(in km) for 
four different vehicles like Bike, Auto, Prime Sedan and Prime SUV.

![Screenshot (1037)](https://user-images.githubusercontent.com/91789120/203691725-c557e927-0aa8-4faf-af55-b6ae532e7fda.png)

User can select one of the four options of vehicles. This will show 
information like Distance, Price(per km), Total price for selected vehicle, etc. as 
shown in below figures.

##### BIKE -

![Screenshot (1038)](https://user-images.githubusercontent.com/91789120/203691748-3a2f08b9-aed8-40f1-bba4-0ca7a5c2f1af.png)

##### AUTO -

![Screenshot (1039)](https://user-images.githubusercontent.com/91789120/203691759-cad42a39-ac76-4db5-98d6-a8ad6ee59ecf.png)

##### PRIME SEDAN -

![Screenshot (1040)](https://user-images.githubusercontent.com/91789120/203691763-ef0509fa-bf4d-4cc6-a049-2ff73544b62c.png)

##### PRIME SUV -

![Screenshot (1041)](https://user-images.githubusercontent.com/91789120/203691771-fb4b6872-5dd4-4893-96d3-936b9297226d.png)
