import { createStore } from 'vuex';
import router from '../router';
import { auth  } from '../firebase';
import { createUserWithEmailAndPassword, signOut ,signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification   } from 'firebase/auth';
import apiRequest from '../utilities/apiRequest';

function getInitialState() {
  return {
    user: null,
    newProduct: null,
    listProduct: [],
    discountProduct: [],
    adminRole: null,
  };
}
const store = createStore({
    state: getInitialState(),
    getters:{
      listProduct: state => state.listProduct,
      getAdmin: state => state.adminRole,
      listDiscountProduct: state => state.discountProduct
    },
    mutations: {
        SET_USER(state, user){
            state.user = user
        },
        CLEAR_USER(state){
            state.user = null
        },
        SET_IS_ADMIN(state, isAdmin){
          if(isAdmin){
            state.adminRole = true
            localStorage.setItem('isAdmin', JSON.stringify(true))
          }else{
            state.adminRole = false
          }
        },
        addProduct(state, newProduct){
          state.newProduct = newProduct
        },
        listAllProducts(state, listProduct){
          state.listProduct = listProduct
        },
        listDiscountProducts(state, discountProduct){
          state.discountProduct = discountProduct
        }
    },
    
    actions:{
      async deleteProduct({commit}, id){
        try {
          const res = await fetch(`http://localhost:3000/product/${id}`, {
            method: 'delete'
          });
          if (!res.ok) {
            throw new Error(`Failed to delete product with ID ${id}: HTTP status ${res.status}`);
          }
          const deletedProduct = await res.json();
          return true; // indicate success
        } catch (error) {
          console.error(error);
          return false; // indicate failure
        }
      },
      async listProducts({ commit }, searchQuery) {
        const searchParams = new URLSearchParams({ search: searchQuery });
        const res = await fetch(`http://localhost:3000/product?${searchParams}`, {
          method: 'get'
        });
        const newProduct = await res.json();
        commit('listAllProducts', newProduct);
      },      
      async listDiscountProducts({commit}){
        const res = await fetch('http://localhost:3000/product/listDiscount?discount=true',
        {
          method: 'get'
        }
        )
        const discountProduct = await res.json();
        commit('listDiscountProducts', discountProduct);
      },
      //Edit product method
      async editProduct({commit}, productData){
        try {
          const res = await fetch(`http://localhost:3000/product/${productData._id}`,
          {
            method: 'put',
            body: JSON.stringify(productData),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (!res.ok) {
            throw new Error(`Failed to edit product with ID ${productData._id}: HTTP status ${res.status}`);
          }
          const editedProduct = await res.json();
          return true; // indicate success
        } catch (error) {
          console.error(error);
          return false; // indicate failure
        }
      },
      //create product method
      async createProduct({ commit }, productData) {
        const formData = new FormData();
        formData.append('title', productData.title);
        formData.append('author', productData.author);
        formData.append('description', productData.description);
        formData.append('sasia', productData.sasia);
        formData.append('ngjyra', productData.ngjyra);
        formData.append('rating', productData.rating);
        formData.append('imageField', productData.imageField);
      
        const res = await fetch('http://localhost:3000/product', {
          method: 'post',
          body: formData,
        });
      
        const newProduct = await res.json();
        commit('addProduct', newProduct);
      },
      
        async login({ commit }, details) {
          const { email, password } = details;
          try {
            await signInWithEmailAndPassword(auth, email, password);

            const user = auth.currentUser;
            const idTokenResult = await user.getIdTokenResult();
            const isAdmin = idTokenResult.claims.admin || false;
            commit('SET_USER', auth.currentUser);
            commit('SET_IS_ADMIN', isAdmin); // store the isAdmin value in Vuex

            router.push('/');
          } catch (error) {
            switch (error.code) {
              case 'auth/user-not-found':
                document.getElementById('infolog').innerHTML = "Personi nuk u gjet!";
                break;
              case 'auth/wrong-password':
                document.getElementById('infolog').innerHTML = "Fjalëkalimi juaj është gabim!";
                break;
              default:
            }
            return;
          }
        },
      
        async register({ commit }, details) {
          try {              
              const response = await apiRequest.registerUser(details);
              const user = response.user;
              if(user){
                await signInWithEmailAndPassword(auth, details.email, details.password, details.username);
              }
              // Commit successful registration to Vuex store
              commit('SET_USER', auth.currentUser);
              router.push('/')
          } catch (error) {
              // Handle registration error
              console.error('registration error', error);
          }
      },
      //   const { email, password } = details;
      
      //   try {
      //     const userCredential = await createUserWithEmailAndPassword(
      //       auth,
      //       email,
      //       password
      //     )

      //     // Send email verification to the user
      //     await sendEmailVerification(userCredential.user);
      
      //     // Wait for the user to verify their email
      //     await auth.currentUser.reload();
      //     const user = auth.currentUser;
      //     while (!user.emailVerified) {
      //       await new Promise(resolve => setTimeout(resolve, 1000));
      //       await user.reload();
      //     }
      //     // Update Vuex store with user information
      //     commit('SET_USER', user);
      //     router.push('/');
      
      //     // Notify the user that their email has been verified
      //     alert('Your email has been verified.');
      //   } catch (error) {
      //     switch (error.code) {
      //       case 'auth/email-already-in-use':
      //         alert('Email already in use');
      //         break;
      //       case 'auth/invalid-email':
      //         alert('Invalid email');
      //         break;
      //       case 'auth/operation-not-allowed':
      //         alert('Operation not allowed');
      //         break;
      //       case 'auth/weak-password':
      //         alert('Weak password');
      //         break;
      //       default:
      //         alert('Something went wrong');
      //     }
      //     return;
      //   }
      // },      
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
          }
         
        ,
        
        //logout 
        async logout ({ commit }) {
            await signOut(auth)
            localStorage.clear();
            commit('CLEAR_USER')
      
            router.push('/login')
          },
        
          fetchUser({ commit }) {
            auth.onAuthStateChanged(async (user) => {
              if (user === null) {
                commit('CLEAR_USER');
               }
                 else {
                     commit('SET_USER', user);

                     if (router.isReady() && router.currentRoute.value.path === '/login') {
                       router.push('/');
                     }
                 }
            });
          }
        }
      })
      export default store;