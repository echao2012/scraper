# Scraper for Ars Technica
[Visit the Deployed Site](https://scraper-echao.herokuapp.com/)

This website scrapes the [Ars Technica](https://arstechnica.com/) front page for new articles and saves the headlines to a database. You can save articles and add notes to your saved articles.

## About
Scraping is accomplished with the [cheerio](https://www.npmjs.com/package/cheerio) npm package. Article headlines are saved to a [MongoDB](https://www.mongodb.com/) database by using [mongoose](https://mongoosejs.com/) for object data modeling.
