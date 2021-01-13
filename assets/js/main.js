const app = new Vue({
  el: '#app',
  data: {
    baseUrl: 'http://localhost:3000',
    tasks: [],
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
    loginFormShow: true,
    addNewTitle: '',
    addNewCategory: '',
    editTitle: '',
    editCategory: '',
    editDataId: ''
  },
  methods:{
    handleLogin(){
      let email = this.emailLogin
      let password = this.passwordLogin
      axios({
        method: 'POST',
        url: `${this.baseUrl}/login`,
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
        url: `${this.baseUrl}/register`,
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
          this.emailLogin = this.emailRegister
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
        this.getTasks()
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
    },
    getTasks(){
      axios({
        method: 'GET',
        url: `${this.baseUrl}/tasks`,
        headers:{
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          return res.data
        })
        .then(data => {
          this.tasks = []
          this.tasks = data
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    addNewTask(){
      $('#addTaskModal').modal('toggle')
      let title = this.addNewTitle
      let category = this.addNewCategory
      axios({
        url: `${this.baseUrl}/tasks`,
        method: 'POST',
        headers:{
          access_token: localStorage.getItem('access_token')
        },
        data:{
          title,
          category
        }
      })
        .then(res => {
          return res.data
        })
        .then(res => {
          this.checkAuth()
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    editTaskById(id){
      axios({
        url: `${this.baseUrl}/tasks/${id}`,
        method: 'GET',
        headers:{
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          return res.data
        })
        .then(data => {
          this.editTitle = data.title
          this.editCategory = data.category
          this.editDataId = data.id
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    handleEditData(){
      $('#editTaskModal').modal('toggle')
      let title = this.editTitle
      let category = this.editCategory
      axios({
        url: `${this.baseUrl}/tasks/${this.editDataId}`,
        method: 'PUT',
        headers:{
          access_token: localStorage.getItem('access_token')
        },
        data:{
          title,
          category
        }
      })
        .then(res => {
          return res.data
        })
        .then(res => {
          this.checkAuth()
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteTask(id){
      $('#editTaskModal').modal('toggle')
      axios({
        url: `${this.baseUrl}/tasks/${id}`,
        method: 'DELETE',
        headers:{
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          return res.data
        })
        .then(data => {
          this.checkAuth()
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  created(){
    this.checkAuth()
  },
  computed:{
    backlogTasks(){
      return this.tasks.filter(task => task.category === 'Backlog')
    },
    toDoTasks(){
      return this.tasks.filter(task => task.category === 'ToDo')
    },
    completedTasks(){
      return this.tasks.filter(task => task.category === 'Completed')
    },
    doneTasks(){
      return this.tasks.filter(task => task.category === 'Done')
    }
  }
})