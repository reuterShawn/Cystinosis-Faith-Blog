import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import articles from './article-content';
import NotFoundPage from './NoteFoundPage';
import axios from 'axios';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';
import ImageGallery from '../components/ImageGallery';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false});
    const { canUpvote } = articleInfo;
    const { articleId } = useParams();

    const { user, isLoading } = useUser();

    const images = [
        '../images/boundaryWaters.JPG',
        '../images/grandMarais.JPG',
        '../images/shawn.jpeg',
        '../images/portfolio-05.JPG',
    ];

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/articles/${articleId}`, { headers });
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }

        if (!isLoading) {
            loadArticleInfo();
        }
    }, [isLoading, user]);

    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null,  {headers});
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    if (!article) {
        return <NotFoundPage/>
    }
    return (
        <>
        {/* <ImageGallery images={images} /> */}
        <img className='article-image' src={article.image}></img>
        <br></br>
        <h1 className='article-title'>{article.title}</h1>
        <div className="upvotes-section">
            {user
                ? <button onClick={addUpvote}>{canUpvote ? "Upvote" : 'Already Upvoted'}</button>
                : <button>Log in to upvote</button>}
            <p>This article has {articleInfo.upvotes} upvote(s)</p>
        </div>
        <br></br>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        <br></br>
        {user
            ?<AddCommentForm
                articleName={articleId}
                onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}/>
            : <button>Log in to add a comment </button>}
        <CommentsList comments={articleInfo.comments}/>
        </>
    )
}
export default ArticlePage;