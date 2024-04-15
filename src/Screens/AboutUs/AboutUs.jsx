import React from 'react';
import './aboutUs.css'; 
import Developer1Image from '../../img/Developer1Image.png'; 
import Developer2Image from '../../img/Developer2Image.png';   
import Developer3Image from '../../img/defaultpicture.png'; 
import Developer4Image from '../../img/Developer4Image.png'; 

function AboutUs() {
  return (
    <div className="aboutUsContainer">
      <h1>About Road Runner</h1>
      <div className="projectInfo">
        <h2>Meet Team RoadRunner</h2>
      </div>
      <div className="developersSection">
        <div className="developer">
          <img src={Developer1Image} alt="developer1" className='developerImg' />
          <div className="developerInfo">
            <h2 className='aboutusTitle'>John Lopez</h2>
            <p>
              I'm passionate about coding, where I excel by applying my love for problem-solving and pattern recognition. 
              When I'm not immersed in tech, I recharge by exploring scenic trails, hiking, or running. 
              My downtime is spent getting lost in fantasy books, playing video games, or catching up on my favorite shows.
            </p>
            <h2 className='aboutusSkill'>Skills</h2>
              <p className='skillName'><strong>Effective Communication & Team Collaboration:</strong></p>
              <p> Excel at working within teams to meet tight deadlines.</p>
              <p className='skillName'><strong>Logical Problem Solving:</strong></p>
              <p> Adept at deconstructing complex logic into clear, manageable steps.</p>
              <p className='skillName'><strong>Design:</strong></p>
              <p>Proficient in creating visually appealing, responsive designs.</p>
              <p className='skillName'><strong>Project Management:</strong></p>
              <p> Experienced in leading projects and maintaining workflow efficiency under pressure.</p>
            
          </div>
        </div>
        <div className="developer">
          <img src={Developer2Image} alt="developer2" className='developerImg'/>
          <div className="developerInfo">
          <h2 className='aboutusTitle'>Ambre Tate</h2>
            <p>
              I'm a Brooklyn-based software engineer who is passionate about finding and implementing solutions for the end-user. 
              Outside of work, I like to spend time outdoors (especially on the water), deep-diving into TV, and exploring new places.
            </p>
            <h2 className='aboutusSkill'>Skills</h2>
              <p className='skillName'><strong>Customer Focus:</strong></p>
              <p>Over 15 years working with customers to identify needs and present solutions</p>
              <p className='skillName'><strong>Creative Problem Solving:</strong></p>
              <p>Easily able to connect disparate ideas to find unique solutions</p>
              <p className='skillName'><strong>Communication:</strong></p>
              <p>Can act as a conduit between end users and technical teams to ensure needs are translated into actionable user stories for implementation</p>
              <p className='skillName'><strong>Data Analysis:</strong></p>
              <p>Over 4 years of experience working in SQL-based BI tools</p>

          </div>
        </div>
        <div className="developer">
          <img src={Developer3Image} alt="developer3" className='developerImg'/>
          <div className="developerInfo">
          <h2 className='aboutusTitle'>Luis Payan</h2>
            <p>
              I'm a software engineer who is passionate about coding, and learning more each day, and each project to improve on my overall skills to become better than I was.
              Outside of work, I like to cook, enjoy traveling, and site seeing.
            </p>
            <h2 className='aboutusSkill'>Skills</h2>
            <p>
              <p className='skillName'><strong>Dedication:</strong></p>
              <p>Over the past 8 years working in the Marines, and wind turbine technician I always dedicated my time to solve a problem, and find a solution.</p>
              <p className='skillName'><strong>Communication & Punctionality:</strong></p>
              <p>I am always on time with communication, punctual when in comes to work.</p>
              <p className='skillName'><strong>Adaptabilty:</strong></p>
              <p>I am a person that adapts when confronted with complex problems, I will find a way to understand, and solve the problem presented to me</p>
              <p className='skillName'><strong>Styling:</strong></p>
              <p>I like to style, and make the design on a website look unique and learn as I go.</p>
            </p>
          </div>
        </div>
        <div className="developer">
          <img src={Developer4Image} alt="developer4" className='developerImg'/>
          <div className="developerInfo">
          <h2 className='aboutusTitle'>Semi Adebayo</h2>
            <p>
              It was nice working on this project with this group of great developers. On weekends While not working nor coding, 
              I like playing real football , watching movies, and enjoy time with family and friends. 
            </p>
            <h2 className='aboutusSkill'>Skills</h2>
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
