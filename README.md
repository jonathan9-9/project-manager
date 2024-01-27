# About The Project

![image](https://github.com/jonathan9-9/project-manager/assets/129327394/10e61de5-99d9-4f0a-b881-86abf46cd804)

This project is designed to characterize some of the important tasks and projects users can organize into their daily lives in a structured manner. It is engineered with the idea that large,
complex tasks can feel overwhelming; this application will solve some of those problems by providing organization and structure to your life.

## Built With

This project is built with the following technologies, frameworks and libraries to bootstrap the project:

- ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)

* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## Getting Started

To bring down this project to your local machine follow the following instructions

## Prerequisites

In order to work on this project you must have Node.js installed

- npm

  ```
  npm install -g npm
  ```

## Installation

1. CD into your working directory
1. git clone `https://github.com/jonathan9-9/project-manager.git`
1. Run the application on your local machine and open it up on VSCode with command: code .
1. Install NPM packages
   `npm install`
1. Run the application on a development server http://localhost:5000 using npm run dev by changing the default port via package.json file
1. Install the nestjs CLI using the command: `npm i -g @nestjs/cli`
1. Run the development server via `npm run start:dev` on http://localhost:3000

## Database Migrations

If you have an existing database schema the following is relevant.

1. To run database migrations using Prisma ORM use the command: `prisma migrate dev` to apply the changes to your database
1. To run database introspection for possibly existing data from raw SQL commands into a data model in your prisma schema you can run the command: `npx prisma db pull`
1. In order to use `prisma migrate dev` for an introspected database you need to baseline your database you can create a migrations directory using: `mkdir -p prisma/migrations/0_init`
1. Generate the migration file using: `npx prisma migrate diff --from-empty --to-schema-data model prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql`
1. Install prisma client `npm install @prisma/client`
1. Then generate the prisma client with the command: `npx prisma generate`; this will modify each time the ‘./prisma/client’ folder to generate a new prisma client instance each time you run the npx prisma generate command to make the latest queries to your database

## Resources

- Trello Board:
  - https://trello.com/b/JBwUiAeE/main-board-todo-app

## Contributions

In the vibrant open-source community, contributions play a pivotal role in fostering a space for learning, inspiration, and collaborative creation. Your input is truly appreciated.

Should you have any suggestions to improve this project, please consider forking the repository and initiating a pull request. Another option is to open an issue with the "enhancement" tag. And, of course, a star for the project would be a fantastic way to express your support! Thank you once again for being a part of this journey.

1. Fork the Project
2. Create your feature branch (`git branch -b featureName`)
3. Commit your changes (`git commit -m 'Add an feature description'`)
4. Push to the branch (`git push origin feature`)
5. Open a PR

## Contact

- Name: Jonathan Cornejo
- Linkedin: https://www.linkedin.com/in/jonathan-cornejo/

## Acknowledgments
