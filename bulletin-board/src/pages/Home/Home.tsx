import React from 'react';

type HomeProps = {
    
};
const Home = () => {
    return (
        <div>
            <div className="intro">
                <h1 id="intro-header">Welcome to Bulletin</h1>
                <p id="intro-message">Our application allows you to read, create, edit and delete articles. Create an account to begin editing!</p>
            </div>

            {articles.isError && <p> Something went wrong...</p>}

            {articles.isLoading ? (
                <p>Loading...</p>
            ) : (
                <List list={articles.data} />
            )}
        </div>
    );
}

export default Home;