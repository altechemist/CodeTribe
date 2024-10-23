# Introduction to MongoDB

## Using simple commands to create a database and add collection

### Task 1: Create a database and name it Codetribe.

- use Codetribe

### Task 2: Create collections named Facilitators, Trainees and Projects that contains unique fields:

#### Task 2.a

- > db.Facilitators.insertOne({name: "Prof Manser", location: "Kimberley", course: "NoSQL"})

#### Task 2.b

- > db.Trainees.insertOne({name: "Daniel Son", location: "Kimberley", facilitator: "Prof Manser"})

#### Task 2.c

- > db.Projects.insertOne({name: "Hotel App", course: "NoSQL", lesson: "Chapter 1",})
