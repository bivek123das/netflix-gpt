import { signOut, onAuthStateChanged  } from 'firebase/auth';
import React,{useEffect} from 'react'
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/store/userSlice';
import { useNavigate } from 'react-router-dom';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView, toggleGptMovieView } from '../utils/store/gptSlice';
import { changeLanguage } from '../utils/store/configSlice';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  user = useSelector(store => store.user);
  const {showGptSearch, showMovieDes} = useSelector(store => store.gpt);

  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  useEffect(() => {
   const unsubscribed =  onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
        // ...
      }
    });

    return ()=> unsubscribed();
  }, []);

  const hanldeGptSearchClick = ()=>{
     dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e)=>{
    dispatch(changeLanguage(e.target.value))
  }


 

  return (
    <div className='flex flex-col md:flex-row  justify-between items-cneter absolute w-screen px-8 py-2 bg-gradient-to-b from-black  z-10 '>
        <img className='w-44 mx-auto md:mx-0' src={LOGO} alt='netflix-header'/>

        {user && <div className='flex p-2 items-center justify-between'>
          {
            showGptSearch && !showMovieDes && <select onChange={handleLanguageChange} className='bg-gray-900 text-white outline-none rounded-lg m-1 md:m-2 p-1 md:p-2 text-sm md:text-md'>
                 {
                   SUPPORTED_LANGUAGES.map((lang)=>
                     ( <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
                   )
                 }
            </select>
          }
          
            {!showMovieDes ? <button  className='text-white bg-purple-500 m-2 px-2 md:px-4 text-sm md:text-md  py-1 md:py-1 rounded-lg' onClick={hanldeGptSearchClick}>{showGptSearch ? "HomePage" : "SearchPage"}</button>:<button  className='text-white bg-purple-500 m-2 px-2 md:px-4 text-sm md:text-md  py-1 md:py-1  rounded-lg'  onClick={() =>  {dispatch(toggleGptSearchView());  dispatch(toggleGptMovieView()); }}>Homepage</button>}


           <img className='hidden w-12 h-12 md:block ' src={user?.photoURL} alt="user-icon"/>
           <button onClick={handleSignOut} className='font-bold text-sm md:text-md text-white'>(SignOut)</button>
        </div>}
    </div>
  )
}

export default Header;


