// About me
const personal_details = {
    name: "Jon",
    surname: "Doe",
    bio: "I'm Jon Doe, a passionate software developer with a love for technology that runs deep. From the intricate complexities of coding to the boundless possibilities of software development, I thrive on the challenges and rewards this field offers. My dream? To be recognized as one of the best in the industry while living a nomadic lifestyle, embracing new experiences and cultures while still deeply immersed in the world of technology. Join me on this journey as I strive to push the boundaries of innovation and creativity, one line of code at a time.",
    projects: ["Mario", "Filter", "Recover"],
    education: "University of Hard Knoxx"
}

const contact_details = {
    phone: "083-456-7890",
    email: "jon.doe@securiti.co",
    github: "jdoe@github.io",
    twitter: "twitter.com/jdoe",
    facebook: "Jon Doe"
}

const address = ["404 Matrix St.", "Hacker Valley, Internet", "World Wide Web"]

const projects = ["Mario", "Filter", "Recover"]

// Show data
function showPersonalDetails(){

    document.getElementById("name").innerHTML = personal_details.name + " " + personal_details.surname;
    document.getElementById("bio").innerHTML = personal_details.bio;


    let length = address.length;
    for (let i = 0; i < length; i++){
        
    }
}

//alert("Hello\nHow are you?");

//object.addEventListener("load", showPersonalDetails());

//showPersonalDetails();