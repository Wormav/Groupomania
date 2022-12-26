# GROUPOMANIA

## Description :

Seventh project of the web developer course at Openclassrooms. The objective is to create a corporate social network

![Capture d'écrant](./docs/Screen%201.jpeg)

![Capture d'écrant mobile](./docs/Screen%202.jpeg)

Video presentation [here](https://youtu.be/lyVyJS1Gapw)

### Specifications

- Using a javascript framework
- Using an sql database
- Site usable on mobile
- Account deletion possible
- Moderation by site administrator possible

### Notes on the realization of the project

- The integration is done on the Visual Studio Code editor with the
- The database was created with [MYSQL](https://www.mysql.com/)
- Framework used [REACT.JS](https://fr.reactjs.org/)
- Library used : [REDUX](https://redux.js.org/) and [REACT-ICONS](https://react-icons.github.io/react-icons/)

## Installation :

### Prerequisite

- You must have [Node](https://nodejs.org/en/) installed on your machine

- You must have an SQL database

### Installation

1. Clone the project's Github repository

Open a new terminal and run the following commands:

```bash
cd installation-path # Go to the folder where you want to install the project (replace 'installation-path' with the desired path)
git clone https://github.com/Wormav/Groupomania.git
cd groupomania # Move to the folder you just cloned
```

Install project dependencies with the yarn command

2. Initialize the database

Use a MYSQL database to create the project database structure (you will find .sql files in the project documentation).

3. Configure the backend

Add an .env file in the config directory and configure it like this:

![exempl env](/docs/Env.jpeg)

You can then launch the backend with the command yarn start

4. Configure the frontend

Go to the customer directory

Create an .env file and configure it like this:

![exemple env](/docs/EnvFront.png)

WARNING in the server.js file the port in correspond to the cors option

5. Start the project

Launch two terminals and run the following commands:

```bash
yarn start
```

```bash
cd client / yarn dev
```

## Contact

You can contact me by email : jeremy.lorette@outlook.com
