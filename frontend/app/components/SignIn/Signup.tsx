"use client";

interface LoginResponse {
	error?: string;
	message?: string;
	user?: {
	  id: number;
	  email: string;
	};
	token: string;
  }

import { getSocket } from "../../socket";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

const fadeIn = {
	initial: { opacity: 0 },
	animate: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
};

const Signup: React.FC = () => {
	const socket = getSocket()
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [isSignUpMode, setIsSignUpMode] = useState(false);

	const handleSignUpClick = () => {
		setIsSignUpMode(true);
	};

	const handleSignInClick = () => {
		setIsSignUpMode(false);
	};

	const handleSignInSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
     	setError('');
		socket.emit('loginUser', { email, password });

      	socket.on('loginResponse', (response: LoginResponse) => {
          setLoading(false);

          if (response.error) {
              setError(response.error);
          } else {
              console.log('Login successful:', response.user);
              localStorage.setItem('token', response.token);
          }
      });
		console.log("Sign-in form submitted");
	};

	const handleSignUpSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
        setError('');
		if (password.length < 8)
		{
			setError("Password too short.")
			setLoading(false)
		}
		if (!password.match(/[A-Z]/))
		{
			setError("Password does not contain a capital letter.")
		}
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			setLoading(false);
			return;
		}
		try {
			console.log("Emitting the createUser stuff");
			socket.emit(
			  "createUser", 
			  {email, password, username}, 
			  (response: { error?: string; user?: any }) => {
				if (response.error) {
				  console.error("Error from server:", response.error);
				  setError(response.error); // Update UI with the error
				  return;
				}
			  console.log("Successfully emitted");
		  
				// Successful registration
				const userData = response.user;
				console.log("User registered successfully:", userData);
			  }
			);
		  } catch (error: unknown) {
			if (error instanceof Error) {
			  console.error("General error:", error.message);
			  setError(error.message);
			} else {
			  console.error("Unexpected error:", error);
			  setError("Something went wrong!");
			}
		  } finally {
			setLoading(false);
		  }
		console.log("Sign-up form submitted");
	};

	return (
		<motion.div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`} variants={fadeIn} initial="initial" animate="animate">
			<div className="forms-container">
				<div className="signin-signup">
					<form action="#" className="sign-in-form" onSubmit={handleSignInSubmit}>
						<h2 className="title">Sign in</h2>
						<div className="input-field">
							<FontAwesomeIcon icon={faUser} className="icon" />
							<input type="text" placeholder="Username" />
						</div>
						<div className="input-field">
							<FontAwesomeIcon icon={faLock} className="icon" />
							<input type="password" placeholder="Password" />
						</div>
						<input type="submit" value="Login" className="btn solid" />
						<p className="social-text text-black">Or Sign in with social platforms</p>
						<div className="social-media">
							<a href="#" className="social-icon">
								<FontAwesomeIcon icon={faFacebookF} />
							</a>
							<a href="#" className="social-icon">
								<FontAwesomeIcon icon={faTwitter} />
							</a>
							<a href="#" className="social-icon">
								<FontAwesomeIcon icon={faGoogle} />
							</a>
							<a href="#" className="social-icon">
								<FontAwesomeIcon icon={faLinkedinIn} />
							</a>
						</div>
					</form>

					<form action="#" className="sign-up-form" onSubmit={handleSignUpSubmit}>
						<h2 className="title">Sign up</h2>
						<div className="input-field">
							<FontAwesomeIcon icon={faUser} className="icon" />
							<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
						</div>
						<div className="input-field">
							<FontAwesomeIcon icon={faEnvelope} className="icon" />
							<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
						</div>
						<div className="input-field">
							<FontAwesomeIcon icon={faLock} className="icon" />
							<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
						</div>
						<div className="input-field">
							<FontAwesomeIcon icon={faLock} className="icon" />
							<input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
						</div>
						<input type="submit" className="btn" value="Sign up" />
						<p className="social-text text-black">Or Sign up with social platforms</p>
						<div className="social-media">
							<a href="#" className="social-icon">
								<FontAwesomeIcon icon={faFacebookF} />
							</a>
							<a href="#" className="social-icon">
								<FontAwesomeIcon icon={faTwitter} />
							</a>
							<a href="#" className="social-icon">
								<FontAwesomeIcon icon={faGoogle} />
							</a>
							<a href="#" className="social-icon">
								<FontAwesomeIcon icon={faLinkedinIn} />
							</a>
						</div>
					</form>
				</div>
			</div>

			<div className="panels-container">
				<div className="panel left-panel">
					<div className="content">
						<h3>New here?</h3>
						<p>Shop smarter by creating your Bargain Buddy Account</p>
						<button className="btn transparent" onClick={handleSignUpClick}>
							Sign up
						</button>
					</div>
				</div>
				<div className="panel right-panel">
					<div className="content">
						<h3>Already have an account?</h3>
						<p>View your wishlist when you sign-in</p>
						<button className="btn transparent" onClick={handleSignInClick}>
							Sign in
						</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Signup;
