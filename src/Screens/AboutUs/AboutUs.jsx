import React from 'react';
import './aboutUs.css'; 
import Developer1Image from '../../img/Developer1Image.png'; 
import Developer2Image from '../../img/Developer2mage.png';   
import Developer3Image from '../../img/Developer3Image.png'; 
import Developer4Image from '../../img/Developer4Image.png'; 

function AboutUs() {
  return (
    <div className="about-us-container">
      <h1>About Road Runner</h1>
      <div className="project-info">
        <h2>Our Project</h2>
        <p>
          Why we chose this
          Our struggles / accomplishment
          
        </p>
      </div>
      <div className="developers-section">
        <div className="developer">
          <img src={Developer1Image} alt="Developer 1" />
          <div className="developer-info">
            <h2>About Me</h2>
            <p>
              I'm passionate about coding, where I excel by applying my love for problem-solving and pattern recognition. 
              When I'm not immersed in tech, I recharge by exploring scenic trails, hiking, or running. 
              My downtime is spent getting lost in fantasy books, playing video games, or catching up on my favorite shows.
            </p>
            <p>
              Skills:
              Effective Communication & Team Collaboration: Excel at working within teams to meet tight deadlines.
              Logical Problem Solving: Adept at deconstructing complex logic into clear, manageable steps.
              Design: Proficient in creating visually appealing, responsive designs.
              Project Management: Experienced in leading projects and maintaining workflow efficiency under pressure.
            </p>
          </div>
        </div>
        <div className="developer">
          <img src={Developer2Image} alt="Developer 2" />
          <div className="developer-info">
            <h2>About Me</h2>
            <p>
              I'm a Brooklyn-based software engineer who is passionate about finding and implementing solutions for the end-user. 
              Outside of work, I like to spend time outdoors (especially on the water), deep-diving into TV, and exploring new places.
            </p>
            <p>
              Customer Focus - Over 15 years working with customers to identify needs and present solutions
              Creative Problem Solving - Easily able to connect disparate ideas to find unique solutions
              Communication - Can act as a conduit between end users and technical teams to ensure needs are translated into actionable user stories for implementation
              Data Analysis - Over 4 years of experience working in SQL-based BI tools
            </p>
          </div>
        </div>
        <div className="developer">
          <img src={Developer3Image} alt="Developer 3" />
          <div className="developer-info">
            <h2>About Me</h2>
            <p>
              Paragraph 1: 
            </p>
            <p>
              Paragraph 2: 
            </p>
          </div>
        </div>
        <div className="developer">
          <img src={Developer4Image} alt="Developer 4" />
          <div className="developer-info">
            <h2>About Me</h2>
            <p>
              It was nice working on this project with this group of great developers. On weekends While not working nor coding, 
              I like playing real football , watching movies, and enjoy time with family and friends. 
            </p>
            <p>
              SEMIU 
              Primary Care 
              Clinical Pharmcist
              
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
