import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  setDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  function signUp(email, password, displayName) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: displayName,
        })
          .then(() => {
            return userCredential;
          })
          .catch((error) => {
            console.error("Error updating display name:", error);
            throw error;
          });
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        throw error;
      });
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function deleteItem(item) {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        shoes: arrayRemove(item),
      });
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    return signOut(auth);
  }

  async function getUserTrainingPlan() {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        return console.log("User document does not exist");
      }
      const userData = userDoc.data();
      const trainingPlan = userData.trainingPlan;
      return trainingPlan;
    } catch (error) {
      console.log(error);
    }
  }

  async function getShoes() {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        return console.log("User document does not exist");
      }
      const userData = userDoc.data();
      const shoes = userData.shoes;
      return shoes;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserInjuryPlan() {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        return console.log("User document does not exist");
      }
      const userData = userDoc.data();
      const injuryPlan = userData.injuryPlan;
      return injuryPlan;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        const getUserInfo = async () => {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserInfo(userData);
            Cookies.set("verify", "value");
          } else {
            console.log("User document does not exist");
          }
        };

        getUserInfo();
      } else {
        setUserInfo({});
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        userInfo,
        signUp,
        getUserTrainingPlan,
        getUserInjuryPlan,
        getShoes,
        deleteItem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
