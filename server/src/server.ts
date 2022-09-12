import express from 'express';

const app = express();

app.get('/', (request, response) => {
    response.json([
        {
            id: 1,
            name: 'John Doe'
        },
        {
            id: 2,
            name: 'Jane Doe'
        },
        {
            id: 2,
            name: 'Jane Doe'
        }
    ]);
})

app.listen(3333, () => {
    console.log("Server stated on port 3333");
})