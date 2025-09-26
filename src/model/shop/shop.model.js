export class Shop {
	constructor(firstArticle, secondArticle, articles) {
		this.firstArticle = firstArticle;
		this.secondArticle = secondArticle;
		this.articles = articles;
	}

	listArticles() {
		return this.articles;
	}
}