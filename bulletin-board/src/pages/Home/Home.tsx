import {
    Article,
    List,
} from '../../App';

type HomeProps = {
    articles: Array<Article>,
    isError: boolean,
    isLoading: boolean,
};

const Home = (props: HomeProps) => {
    return (
        <div>
            <div className="intro">
                <h1 id="intro-header">Welcome to Bulletin</h1>
                <p id="intro-message">Our application allows you to read, create, edit and delete articles. Create an account to begin editing!</p>
            </div>

            {props.isError && <p> Something went wrong...</p>}

            {props.isLoading ? (
                <p>Loading...</p>
            ) : (
                <List list={props.articles} />
            )}
        </div>
    );
}

export default Home;
