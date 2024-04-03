import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const SingIn = () => {
  const [singInError, setSingInError] = useState("");
  const [singinDone, setSingInDone] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);

  const handelSingIn = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name,email, password, accepted);


    if (password.length < 6) {
      setSingInError("Password must be at least 6 characters");
      return;
    } 
    else if (!/[A-Z]/.test(password)) {
      setSingInError("Password must contain at least one uppercase letter");
      return;
    }
    else if(!accepted){
      setSingInError("Please accept our terms and conditions!");
      return;
    }

    // reset error
    setSingInError("");
    setSingInDone("");

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSingInDone("Sing In Done");

        // update Profile
        updateProfile(result.user,{
            displayName:name
        })
        .then(() => console.log("profile updated"))

        // Send verification Email
        sendEmailVerification(result.user)
        .then( () => {
            alert("Please check your email and verify your account")
        })
      })
      .catch((error) => {
        console.error(error);
        setSingInError(error.message);
      });
  };

  return (
    <div className="">
      <div className="bg-sky-300 pt-32 h-[600px] w-[600px] rounded-full text-center mx-auto hover:border-8 border-4  p-6 border-dotted border-whit  ">
        <h1 className="text-2xl font-bold">Please Sing In</h1>

        <form className="w-full " onSubmit={handelSingIn}>
          <input
            className="w-1/2 mt-5 p-2 rounded-lg"
            type="text"
            name="name"
            id=""
            required
            placeholder="Your Name"
          />
          <br />
          <input
            className="w-1/2 mt-5 p-2 rounded-lg"
            type="email"
            name="email"
            id=""
            required
            placeholder="Email"
          />
          <br />
          <div className="relative">
            <input
              className="w-1/2 mt-5 p-2 rounded-lg"
              type={ShowPassword ? "text" : "password"}
              name="password"
              id=""
              required
              placeholder="Password"
            />
            <span
              className="absolute text-slate-400 top-1/2 text-xl -ml-6"
              onClick={() => setShowPassword(!ShowPassword)}
            >
              {ShowPassword ? <FaEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          <br />
          <input type="checkbox" name="terms" id="terms" />
          <label className="ml-2" htmlFor="terms">
            Accept our Terms and Conditions
          </label>
          <br />
          <button className="btn btn-secondary w-1/2 mt-5">Sing In</button>
        </form>
        <div className="mt-5">
          {singInError && <p className="text-red-500">{singInError}</p>}
          {singinDone && <p className="text-green-500">{singinDone}</p>}
          <p>
          Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
