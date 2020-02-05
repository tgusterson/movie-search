# Movie Searcher

This is a simple express.js app that takes advantage of the TMDb movie api. I created it as my first express application to practice using concepts and technologies I have been learning.


## Getting Started

* Install all of the required packages using npm (https://www.npmjs.com/).
* Use 'npm run dev' to spin up a local development server on port 3000.
* Use 'npm run start' for production deployment.
* You can find a live example of the app here: https://gusterson-movie-finder.herokuapp.com/ 

## Using the app

To use the app, search for a movie from the root page of the app. The app will return results (20 at a time) from TMDb and display them as clickable cards. To load more results for the same search query, users can select the "Next Page" button.

Selecting one of these cards will take the user to a new page containing more details about the particular movie.

A user's latest search (including page) is stored using session storage in the browser so that it appears every time the root page is visited during a session.

### Prerequisites

* [NodeJS](https://nodejs.org/en/)


## Built With

* [Handlebars](https://handlebarsjs.com/) - The templating engine used
* [Express](http://expressjs.com/) - Web server framework

## Contributing

Please feel free to take this code and use it however you want. The only requirement to get it working is signing up for your own TMDb API key (https://www.themoviedb.org/documentation/api).


## Authors

* **Thomas Gusterson** - [tgusterson](https://github.com/tgusterson)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to Brad Traversy for his video on CSS spinners that I used to create my own loader: (https://www.youtube.com/watch?v=BxpjA9t4dJE)
* Thanks to Andrew Mead for his NodeJS Udemy Course which I have been using to learn Node & Express(https://www.udemy.com/course/the-complete-nodejs-developer-course-2/)
