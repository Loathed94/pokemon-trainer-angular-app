# Assignment4 - Pokémon Trainer - About Project
Create a Pokémon Trainer Application using Angular.js.
## Description
Used Angular to build a Pokémon Trainer Application.
The application includes three pages.

1 - Landing Page (Login Page)
Where the user is able to log in as a existing trainer or a new trainer.

2 - Catalogue Page
Shows all the Pokémons available for the trainer to collect(catch) so they get saved in their trainer page. After the trainer collects a pokemon the button gets grayed out and can't capture the same Pokémon again.

3 - Trainer Page (Profile Page)
The trainer page is where the trainer can see all collected(captured) Pokémon and has the choice to remove them from the collection with a click of a button or keep them by not pressing.

- API adds a new trainer if they dont exist already.
- API gets updated with deleted Pokémon, if they remove a Pokémon from the trainer page then it gets removed from the API.
- API gets updated with collected Pokémon, if they add Pokèmon from catalogue page then it gets added to the API. 
## Getting started
### Dependencies
- [NPM/Node.js (LTS - Long Term Support Version)](https://nodejs.org/en/)
- bootstrap
- angular/cli
- angular-router
### Installing
The project:
- [Pokemon-Trainer-Angular-App - Repository](https://github.com/Loathed94/pokemon-trainer-angular-app.git)

Before cloning repository install:
- npm install -g @angular/cli
After cloning repository install:
- npm install
### Executing program
Open Terminal in visual studio code and run the following command to start application:
Option 1: ng serve (Then click on the LocalHost link that shows up in terminal)
Option 2: ng serve -o (Opens the browser without needing to click on the link.)
## Authors
Christian Neij 
Dennis Massoumnataj
## Deployment
https://chrennis-pokemon-app.herokuapp.com/
## License
No license.
## Acknowledgments
- [Figma](https://www.figma.com/file/eDOKdJIzbQc13HkU0wJUEr/Angular?node-id=0%3A1)
- [Heroku](https://www.heroku.com/)
- [readme-template](https://gist.github.com/DomPizzie/7a5ff55ffa9081f2de27c315f5018afc)
