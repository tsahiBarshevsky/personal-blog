import React from 'react'

export default function Hero() {
    return (
        <>
            <section>
                <div className="hero-content">
                    <h1>Wave Shape Banner</h1>
                    <p>Bla bla bla</p>
                </div>
                <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#f5f5f5" fillOpacity="1" d="M0,256L48,218.7C96,181,192,107,288,80C384,53,480,75,576,122.7C672,171,768,245,864,250.7C960,256,1056,192,1152,165.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </section>
        </>
    )
}