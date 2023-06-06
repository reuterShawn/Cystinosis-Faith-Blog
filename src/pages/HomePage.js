import shawn from '../images/shawn.jpeg'

const HomePage = () => {

    return (
            <>
            <h1>Hello and Welcome to my Blog!</h1>
            <p>I am Shawn Reuter an aspiring web developer, </p>
            <img src={shawn} alt='Picutre of Shawn Reuter wearing a red polo'></img>
            </>
    );
};
export default HomePage;