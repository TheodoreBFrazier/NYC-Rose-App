import React from "react";
import "./About.css";
import Avatar from "@mui/material/Avatar";

import david from "../images/david.jpg";
import mukailya from "../images/mukailya.png";
import nns from "../images/nns.png";
import lili from "../images/lili.png";
import theodore from "../images/theodore.png";

function About() {
	return (
		<div className="about">
			<div className="aboutContainer">
				<div className="valuesContainer">
					<h2>Our Values</h2>
					<div className="values">
						<br />
						<p>
							We assume responsibility for our collective strength by developing
							relationships, building diverse and inclusive coalitions, and
							challenging one another to be our best. We act with empathy and
							extend grace to ourselves and others. We accelerate each other and
							are accountable to each other to deliver on our vision.
						</p>
					</div>
					<h2>Mission & Vision</h2>
					<div className="values">
						<br />
						<p>
							Our goal is to connect high school, college students, minorities
							and residents of underserved communities with resources they can't
							get elsewhere. Whether it's be career skills , scholarships ,
							grants, continued learning, programs, etc., we want to bridge the
							the knowledge gap within these underserved communities. We want to
							eliminate the gatekeeping of much needed information and create a
							portal where people can easily find resources they desperately
							need to improve their quality of life.
						</p>
					</div>
				</div>
				<div className="ourTeam">
					<h2>Our Team</h2>
					<div className="teamContainer">
						<div className="eachContainer">
							<div className="aboutDescrption">
								<div>
									<span>Nima sherpa</span>
								</div>
								I am a Full-Stack Developer who loves creating projects and
								implementing new ideas . I am always seeking to expand my
								knowledge on tech , Ability to learn and implement new
								technologies quickly.
							</div>
							<div>
								<Avatar alt="Nima sherpa Img" src={nns} />
							</div>
						</div>
						<div className="eachContainer">
							<div className="aboutDescrption">
								<div>
									<span>Lili Huang</span>
								</div>
								I am a full stack developer. I wanted to become a software
								engineer because it can be creative which means I am able to
								solve problems by putting myself in the users’ shoes and
								providing a solution. The ability to be creative in my work is
								what truly empowers me to move forward and keep learning as an
								engineer.
							</div>
							<div>
								<Avatar alt="Nima sherpa Img" src={lili} />
							</div>
						</div>
						<div className="eachContainer">
							<div className="aboutDescrption">
								<div>
									<span>Mukayila Alao</span>
								</div>
								Software engineering is all what I am passionate about now. I
								graduated from my University as a computer Networks and
								maintenance engineer. I will finish by saying that technology is
								driving our lives today and I can't wait to land my first job
								and contribute.
							</div>
							<div>
								<Avatar alt="Nima sherpa Img" src={mukailya} />
							</div>
						</div>
						<div className="eachContainer">
							<div className="aboutDescrption">
								<div>
									<span>David Vidals</span>
								</div>
								I joined Pursuit to jumpstart my career into coding and start
								creating and helping people. I hope to once day create an
								app/website that can help under served communities in New York.
								A fun Fact about me is that I love play video games.
							</div>
							<div>
								<Avatar alt="Nima sherpa Img" src={david} />
							</div>
						</div>
						<div className="eachContainer">
							<div className="aboutDescrption">
								<div>
									<span>Theodore Frazier</span>
								</div>
								I joined a 12-month, Google-funded software engineering
								fellowship with a 9% acceptance rate whose graduates have been
								hired as developers at leading companies such as Pinterest, JP
								Morgan, and Spotify.
							</div>
							<div>
								<Avatar alt="Nima sherpa Img" src={theodore} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
