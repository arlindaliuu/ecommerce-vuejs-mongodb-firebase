import { createStore } from 'vuex';
import router from '../router';
import { auth  } from '../firebase';
import { createUserWithEmailAndPassword, signOut ,signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification   } from 'firebase/auth';

const store = createStore({
    state:{
        user: null
    },
    mutations: {
        SET_USER(state, user){
            state.user = user
        },
        CLEAR_USER(state){
            state.user = null
        }
    },
    
    actions:{

        async login({commit}, details){
            const { email, password} = details

            try{
                await signInWithEmailAndPassword(auth, email, password)
            }catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                      document.getElementById('infolog').innerHTML = "Personi nuk u gjet!";
                    break;
                    case 'auth/wrong-password':
                      document.getElementById('infolog').innerHTML = "Fjalëkalimi juaj është gabim!";
                    break;
                    default:
                }
                return
            }
            commit('SET_USER', auth.currentUser)

            router.push('/')
        },
        async register({ commit }, details) {
          const { email, password } = details;
        
          try {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
        
            // Send email verification to the user
            await sendEmailVerification(userCredential.user);
        
            // Wait for the user to verify their email
            await auth.currentUser.reload();
            const user = auth.currentUser;
            while (!user.emailVerified) {
              await new Promise(resolve => setTimeout(resolve, 1000));
              await user.reload();
            }
        
            commit('SET_USER', user);
            router.push('/');
        
            // Notify the user that their email has been verified
            alert('Your email has been verified.');
          } catch (error) {
            switch (error.code) {
              case 'auth/email-already-in-use':
                alert('Email already in use');
                break;
              case 'auth/invalid-email':
                alert('Invalid email');
                break;
              case 'auth/operation-not-allowed':
                alert('Operation not allowed');
                break;
              case 'auth/weak-password':
                alert('Weak password');
                break;
              default:
                alert('Something went wrong');
            }
            return;
          }
        },
        
        
        async registerWithGoogle({ commit }) {

            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider)
            .then((result) =>{
              commit('SET_USER', result.user)
              router.push('/')
            })
            .catch((error)=>{
              console.log(error)
            })
         
        },
        
        //logout 
        async logout ({ commit }) {
            await signOut(auth)
      
            commit('CLEAR_USER')
      
            router.push('/login')
          },
        
          fetchUser({ commit }) {
            auth.onAuthStateChanged(async (user) => {
              if (user === null) {
                commit('CLEAR_USER');
              } else {
                await user.reload(); // Reload the user to ensure we have the latest email verification status
                if (user.emailVerified) {
                  commit('SET_USER', user);
                  if (router.isReady() && router.currentRoute.value.path === '/login') {
                    router.push('/');
                  }
                } else {
                  alert('Your email address has not been verified yet. Please click the link in the email that we sent you to verify your account.');
                  commit('CLEAR_USER');
                }
              }
            });
          }
          
          
        }
      })
      export default store;