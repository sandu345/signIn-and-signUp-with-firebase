import { useContext, createContext, useEffect, useState } from "react";

import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from "../firebase.config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const userContext = createContext();
export const useAuth = () => {
  return useContext(userContext);
};

const UserAuthContext = ({ children }) => {
  const [error, setError] = useState("");
  const [currentuser, setuser] = useState();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setuser(user);
        console.log("u are logging");
      } else {
        // alert("u are logout")
      }
    });
  }, [currentuser]);

  const SignIn = async (email, password) => {
    setError("");
    try{
      const userCredencial = await signInWithEmailAndPassword (auth,email, password);
      const user = userCredencial.user;
      console.log('Login Successful:', user.id);
    }catch(signInError){
      setError(signInError.message);
    }
  };

  const SignUp = async (email, password, FirstName, LastName) => {
    setError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        console.log(result);
        try {
          // const docRef = await addDoc(collection(db, "users"), {
          //   FullName,
          //   userId: `${result.user.uid}`
          // });
          const ref = doc(db, "customerCollection", result.user.uid);
          const docRef = await setDoc(ref, {
            FirstName,
            LastName,
            email,
            password,
          });
          try {
            await sendEmailVerification(result.user);
            console.log("Verification email sent.");
          } catch (e) {
            console.error("Error sending verification email: ", e);
          }

          alert("Wellcome new User create successfully");
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setInterval(() => {
            setError("");
          }, 5000);
          setError("email already in use try another email");
        } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
          setInterval(() => {
            setError("");
          }, 5000);
          setError("Password Must be 6 charecter");
        } else {
          setError(err.message);
        }
      });
  };

  const value = {
    SignUp,
    SignIn,
    error,
    currentuser,
  };
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserAuthContext;