import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name=e.target.name.value;
    const photo=e.target.photo.value;
    console.log(name,photo)
    const profile={
      displayName:name,
      photoURL:photo,
    }

    

    const tearms = e.target.tearms.checked;
    console.log(tearms);
    if (!tearms) {
      setErrorMessage("Checked out condition");
      return;
    }
    setSuccess(false);
    if (password.length < 6) {
      setErrorMessage("Password should be more than 6 characters");
      return;
    }

    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!regex.test(password)) {
      setErrorMessage(
        "At least one uppercase one lower case one digit one special characters"
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setErrorMessage("");
        setSuccess(true);

        sendEmailVerification(auth.currentUser).then(() => {
          console.log("email varified");
        });
        updateProfile(auth.currentUser,profile)
        .then(()=>{
          console.log('update profile')
        })
        .catch(error=>{
          console.log('ERROR',error);
        })
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
     
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <h1 className="text-3xl my-8 text-center font-bold">Sign Up</h1>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="name"
            name="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo UlL</span>
          </label>
          <input
            type="text"
            placeholder="Photo url"
            name="photo"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            name="password"
            className="input input-bordered"
            required
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-14"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaEye />}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control">
          <label className="label justify-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="tearms"
              className="checkbox checkbox-primary"
            />

            <span className="label-text">Accept Out Tearms and Condition</span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
      {errorMessage && (
        <div>
          <p className="text-red-700">{errorMessage}</p>
        </div>
      )}
      {success && (
        <div>
          <p className="text-green-600">Succesfully sign up</p>
        </div>
      )}
      <p className="my-6 px-5">
        Already have an account ? please{" "}
        <Link className="text-blue-500" to={"/login"}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
