import './HomePage.css'

export default function HomePage(){
    return(
        <div className='homepage-body'>
            <h2>Input your location to get clothing recommendations for today!!! </h2>
            <div className='input-box'>
                <label htmlFor="options">choose your location!</label>
                <select className='city-selector' id='locations' >
                    <option value="" disabled>Select an Option</option>
                    <option value="Denver">Denver, CO</option>
                    <option value="El Paso">El Paso, TX</option>
                    <option value="Birmingham">Birmingham, AL</option>
                    <option value="Chicago">Chicago, IL</option>
                </select>
                <button className='rec-button'>See your Recommendations!</button>
            </div>
            <p>Have you ever looked at the weather for the day and wondered “What in the world do I wear??” Well then this webpage is for you!!</p>
        </div>
    )
}



