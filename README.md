# Interview Scheduler

Interview Scheduler is a single page React application that allows users to book and cancel interviews.  I have combined a concise API with a WebSocket server to build a realtime experience.

Data is persisted by the API server using a PostgreSQL database and Jest tests were used throughout the development of the project.


## How it Works
When a user loads the Interview Scheduler application, the following page is displayed:

!["Welcome to scheduler"](https://github.com/taylornoj/scheduler/blob/master/docs/app-display.png?raw=true)

Users can create interviews by clicking on the add + button and inputting their name.  If a name is not indicated, a user will see the following error message:
!["must enter name"](https://github.com/taylornoj/scheduler/blob/master/docs/must-enter-name-warning.png?raw=true)

The user will then enter their name and select an interviewer, which will be highlighted in white after selection:
!["filling out input form"](https://github.com/taylornoj/scheduler/blob/master/docs/Edit-show-changes.png?raw=true)

Once the user clicks the Save button, they will be shown a status indicator while asynchronous operations are in progress:
!["Saving status indicator"](https://github.com/taylornoj/scheduler/blob/master/docs/saving-status-indicator.png?raw=true)

Once completed, the user can see their confirmed interview card, displayed in the scheduler:
!["Changes confirmed to appointment"](https://github.com/taylornoj/scheduler/blob/master/docs/changes-made.png?raw=true)

Users are able to quickly modify an existing interview by changing their name and/or interviewer.

Users can also delete an interview entirely, but will first be shown an option to confirm if they want to cancel:
!["Confirm delete warning"](https://github.com/taylornoj/scheduler/blob/master/docs/delete-warning.png?raw=true)

!["Error message when creating apt"](https://github.com/taylornoj/scheduler/blob/master/docs/create-error.png?raw=true)

!["Error message for cancel apt"](https://github.com/taylornoj/scheduler/blob/master/docs/error-delete.png?raw=true)


!["Delete status indicator"](https://github.com/taylornoj/scheduler/blob/master/docs/deleting-status-indicator.png?raw=true)



!["input name"](https://github.com/taylornoj/scheduler/blob/master/docs/Edit-app.png?raw=true)

!["spots remaining display"](https://github.com/taylornoj/scheduler/blob/master/docs/spots-remaining.png?raw=true)
