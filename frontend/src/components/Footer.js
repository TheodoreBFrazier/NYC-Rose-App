import React from "react";
import "./Footer.css";

export default function Footer() {
	return (
		<div className="footer-dark">
			<footer>
				<div class="container">
					<div class="row">
						<div class="col-sm-6 col-md-3 item">
							<h3>About us</h3>
							<ul>
								<li>
									<a href="/about#our_team">Our Team</a>
								</li>
								<li>
									<a href="/about#our_values">Our Values</a>
								</li>
								<li>
									<a href="/about#our_mission">Mission and Vision</a>
								</li>
							</ul>
						</div>

						<div class="col-sm-6 col-md-3 item">
							<h3>Get Involved</h3>
							<ul>
								<li>
									<a href="#!">Careers</a>
								</li>
								<li>
									<a href="#!">Donate</a>
								</li>
								<li>
									<a href="/mentors/create#volunteers">Volunteers</a>
								</li>
							</ul>
						</div>

						<div className="col-md-6 item text">
							<h3>Contact Us</h3>
							<p>EDUK Heaquarters</p>
							<p>123 West 123rd street, #123</p>
							<p>New York, NY 1234</p>
						</div>

						<div class="col item social">
							<a href="#!" className="fa fa-facebook">
								{null}
							</a>
							<a href="#!" className="fa fa-twitter">
								{null}
							</a>
							<a href="#!" className="fa fa-linkedin">
								{null}
							</a>
						</div>
					</div>

					<p class="copyright">Copyright EDUK.com 2022. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
