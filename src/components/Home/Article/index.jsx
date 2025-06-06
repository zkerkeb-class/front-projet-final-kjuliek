import './index.css';
import { useTranslation } from 'react-i18next';

const Article = () => {
    const { t } = useTranslation();
    return (
        <article className="article">
        <h1 className="article-title">{t("article.title")} </h1>
        <div className="article-meta">
            <span className="article-author">By {t("article.author")} </span>
            <span className="article-date">{t("article.date")}</span>
        </div>
        <div className="article-content">
            {t("article.content")}
        </div>
        </article>
    );
};

export default Article;