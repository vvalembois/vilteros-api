import { Article } from '../model/shop/article.model';
import Exception from '../exception/exception';
import { Shop } from '../model/shop/shop.model';
import _ from 'lodash';
import logger from '../logger';

export async function getShop() {
	try {
		const fetchedArticles = await Article.find();
		if (!_.isNil(fetchedArticles)) {
			return new Shop(_.head(fetchedArticles), fetchedArticles[1], _.drop(fetchedArticles, 2));
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching shop, error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}

export async function getArticles() {
	try {
		const fetchedArticles = await Article.find();
		if (!_.isNil(fetchedArticles)) {
			return fetchedArticles;
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching articles, error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}

export async function getArticleById(articleId) {
	try {
		const numericId = Number(articleId);
		if (Number.isNaN(numericId)) {
			return Promise.reject(new Exception(400, 'Invalid article ID'));
		}

		const fetchedArticle = await Article.findOne({ id: numericId });
		if (!_.isNil(fetchedArticle)) {
			return fetchedArticle;
		} else {
			return Promise.reject(new Exception(404));
		}
	} catch (error) {
		logger.error(`Error while fetching article, with id ${articleId} error was: ${error.message}`);
		return new Exception(500, error.message);
	}
}