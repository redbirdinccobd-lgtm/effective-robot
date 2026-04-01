const axios = require('axios');

class JokeGenerator {
    constructor() {
        this.apiUrl = 'https://v2.jokeapi.dev/joke';
    }

    async fetchRandomJoke() {
        try {
            const response = await axios.get(`${this.apiUrl}/Any`);
            return this.formatJoke(response.data);
        } catch (error) {
            console.error('Error fetching joke:', error);
            return 'Failed to fetch a joke.';
        }
    }

    async fetchJokeByCategory(category) {
        try {
            const response = await axios.get(`${this.apiUrl}/${category}`);
            return this.formatJoke(response.data);
        } catch (error) {
            console.error('Error fetching joke by category:', error);
            return 'Failed to fetch a joke from the specified category.';
        }
    }

    formatJoke(jokeData) {
        if (jokeData.type === 'single') {
            return jokeData.joke;
        } else if (jokeData.type === 'twopart') {
            return `${jokeData.setup} - ${jokeData.delivery}`;
        }
        return 'No joke available.';
    }
}

// Example usage:
const jokeGen = new JokeGenerator();

(async () => {
    console.log(await jokeGen.fetchRandomJoke());  // Fetch a random joke
    console.log(await jokeGen.fetchJokeByCategory('Programming'));  // Fetch a joke from Programming category
})();