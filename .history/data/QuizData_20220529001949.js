import axios from 'axios';

axios({
    method: 'GET',
    url: 'https://the-trivia-api.com/api/questions?limit=20&region=FR'
}).then((response) => {
    console.log(response.data);
});

let data = [
    {
        question: "What's the biggest planet in our solar system ?",
        options: ["Saturn", "Jupiter", "Mars", "Neptune"],
        correct_option: "Jupiter"
    },
    {
        question: "Which animal can open his mouth the widest ?",
        options: ["Crocodile", "Lion", "Gorilla", "Hippo"],
        correct_option: "Hippo"
    },
    {
        question: "WHat is the largest animal on earth ?",
        options: ["The lion King", "The giraffe", "The blue whale", "The elephant"],
        correct_option: "The blue whale"
    },
]

export default data;