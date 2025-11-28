
import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import Particle from "../utils/Particle";

// Default Guest Credentials
const DEFAULT_EMAIL = "guest@example.com";
const DEFAULT_PASSWORD = "Guest123das@";
const DEFAULT_NAME = "Guest User";

const Login = () => {
  const [isSigInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  // 🔥 UPDATE PROFILE + REDUX
  const saveUserToRedux = async (user, displayName) => {
    await updateProfile(user, {
      displayName: displayName,
      photoURL: USER_AVATAR,
    });

    const { uid, email, photoURL } = auth.currentUser;

    dispatch(
      addUser({
        uid: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL,
      })
    );
  };

 

  // 🔥 NORMAL SIGN-IN / SIGN-UP
  const handleClick = async () => {
    const emailValue = email.current?.value.trim();
    const passwordValue = password.current?.value.trim();
    const nameValue = name.current?.value?.trim();

    const message = checkValidData(emailValue, passwordValue);
    setErrorMessage(message);

    if (message) return;

    // 🔥 SIGN-UP FLOW
    if (!isSigInForm) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then(async (userCredential) => {
          await saveUserToRedux(userCredential.user, nameValue);
        })
        .catch((error) => {
          setErrorMessage(error.code + "-" + error.message);
        });

      // 🔥 SIGN-IN FLOW
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then(async (userCredential) => {
          console.log("User Signed In");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-credential") {
            setErrorMessage(
              "Incorrect email/password. Please try again or reset your password."
            );
          } else {
            setErrorMessage(error.code + "-" + error.message);
          }
        });
    }
  };

  const toggleClick = () => {
    setIsSignInForm(!isSigInForm);
  };

  return (
    <div className="relative">
      <Header />
      <div className="absolute">
        <img
          className="h-screen object-cover w-screen"
          src={BG_URL}
          alt="logo"
        />
        <Particle />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-6/12 lg:w-3/12 absolute my-36 mx-auto right-0 left-0 p-10 bg-black text-white rounded-lg bg-opacity-80"
      >
        <h1 className="text-3xl py-4 font-bold">
          {isSigInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSigInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700 outline-none"
            defaultValue={DEFAULT_NAME}
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-700 outline-none"
          defaultValue={DEFAULT_EMAIL}
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700 outline-none"
          defaultValue={DEFAULT_PASSWORD}
        />

        <p className="text-red-700 font-bold">{errorMessage}</p>

        <button
          className="p-4 my-4 font-bold bg-red-700 w-full rounded-lg"
          onClick={handleClick}
        >
          {isSigInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleClick}>
          {isSigInForm
            ? "New to Netflix? Sign up now."
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
