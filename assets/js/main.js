const baseUrl = `http://localhost:3000`
const app = new Vue({
  el: '#app',
  data: {
    tasks: ['sadKEK', 'KEKL'],
    emailLogin: '',
    passwordLogin: '',
    emailRegister: '',
    passwordRegister: '',
    firstNameRegister: '',
    lastNameRegister: '',
    authShow: true,
    mainShow: true,
    loggedEmail: '',
    registerFormShow: false,
    loginFormShow: true
  },
  methods:{
    handleLogin(){
      let email = this.emailLogin
      let password = this.passwordLogin
      axios({
        method: 'POST',
        url: `${baseUrl}/login`,
        data:{
          email,
          password
        }
      })
        .then(response => {
          return response.data
        })
        .then(data => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          this.emailLogin = ''
          this.passwordLogin = ''
          this.checkAuth()
        })
        .catch(error => {
          console.log(error.response)
          this.emailLogin = ''
          this.passwordLogin = ''
          this.checkAuth()
        })
    },
    handleRegister(){
      let email = this.emailRegister
      let password = this.passwordRegister
      let first_name = this.firstNameRegister
      let last_name = this.lastNameRegister
      axios({
        method: 'POST',
        url: `${baseUrl}/register`,
        data:{
          email,
          password,
          first_name,
          last_name
        }
      })
        .then(res => {
          return res.data
        })
        .then(data => {
          this.showLoginForm()
        })
        .catch(err => {
          this.emailRegister = ''
          this.passwordRegister = ''
          this.firstNameRegister = ''
          this.lastNameRegister = ''
          this.checkAuth()
        })
    },
    handleLogout(){
      localStorage.clear()
      this.checkAuth()
    },
    checkAuth(){
      if(localStorage.getItem('access_token')){
        this.authShow = false
        this.mainShow = true
        this.loggedEmail = localStorage.getItem('email')
      }else{
        this.authShow = true
        this.mainShow = false
      }
    },
    showLoginForm(){
      this.registerFormShow = false
      this.loginFormShow = true
    },
    showRegisterForm(){
      this.registerFormShow = true
      this.loginFormShow = false
    }
  },
  created(){
    this.checkAuth()
  }
})