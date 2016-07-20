#Pixel Houz
##Adam Hefnider, Anne Tomassoni, Anthony Peloza, Brandon Gladen
##June 21, 2016 | Version 1.0

#Link
##https://fierce-tundra-63876.herokuapp.com/#/
This is a sandbox mirror of the actual site so that others can look at it themselves. For testing purposes, you may login with the following credentials.

ADMIN
username: admin
password: 1

PHOTOGRAPHER
username: photographer
password: 1

#Application Overview
Pixel Houz is a web application that allows freelance photographers to connect with a realtor’s real estate clients to schedule photo sessions. It has a messaging feature that allows clients and photographers to discuss schedules and verify times for the sessions, without going through the realtor. A map of available jobs allows photographers to take jobs that work for them geographically. Realtors are able to add jobs, read conversations and view schedules. 

#Application Features
There are three main users: Admin, photographer (“user”), and client.





##Log In Screen
This is a simple login form where the photographer and the Admin can log in. All the users are pre-existing so there is no ability to register. It is the portal to the site. 


##Admin View
###Home Screen
This displays the map of jobs that the Admin (the realtor) has added. After login, it is the first thing seen. 



##Create Job
The Admin will have the ability to add jobs to the map. When a job is added by address the Admin will be able to select job details from a list of preset details that are tied to prices. Total price for the job will be calculated automatically from these details, which include size of the property and add-ons: drive-bys, aerial city or country photos, video, and slideshows. 

The client’s email(s) will be entered here, in order to open up a link for the communication between photographer and client. 

Lockbox or entry information for the property can be optionally be added as a note. This will not show to the photographer until the job is confirmed. 

The client’s availability for the photo shoot can optionally be entered into the job to assist in narrowing down the appointment time. There will be an add/save job button to post to the map.  


An email will be sent to all photographers notifying them of a new job added. 

##Job List
This is a view where the realtor can view the list of jobs that are one of four types of jobs with color codes:
1. Available jobs - red: these are jobs that have not been accepted by a photographer
2. Accepted jobs - yellow: these jobs have been accepted by one photographer but a photo session time has not been finalized between the client and photographer.
3. Finalized jobs - green: photo sessions that have been scheduled and agreed upon by the client and photographer. 
4. Finished jobs - grey and white: the realtor has completed all necessary transactions with the job including receiving photos and paying photographer, and this entry exists only as a record. The admin tags a job as finished by clicking on a ‘finish’ button on the finalized jobs. Jobs can also be removed with a ‘delete’ button in the case that it was cancelled or otherwise needs to be removed.

##Create User
Only the Admin has the ability to create photographer accounts.
In this view, the Admin can create a user account for each photographer with unique sign-in information that is communicated to the photographers, with their name, email, phone number, and optional notes about desired locations and other preferences. 


##User List
This is the list of all the photographers created by the Admin. Users can be edited or deleted by the Admin.



#Photographer View
##Home Screen Map
After login, user is taken to a full page map view with jobs shown as pin locations. On scroll down, the available jobs list is displayed with job pay, address, and approximate due date. The photographer can either click on the map or the list and see a modal (popup style window) with more details about the job. Inside the modal there will be a button to accept the job. 


After the job is accepted, the photographer will be taken to their My Jobs view.

##My Jobs
In this view, the photographer will be able to view a list of accepted jobs with information about the job. If the address is clicked, a new tab in the current browser will be opened to the Google Maps site with that address active so that the user can get directions, etcetera. A button will expand a window with the conversation between the client and photographer on each job entry. Once a time is confirmed with the client, the photographer will be able to set this as the confirmed time on the job list and the job becomes confirmed. 

#Client View
The client does not need to log in. The client will interact with the photographer via their e-mail. The client can reply to messages from the photographer which the photographer will see listed under their My Jobs view.
