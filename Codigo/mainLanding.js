class Post {
    constructor(title, link, illness) {
      this.title = title;
      this.link = link;
      this.illness = illness;
    }
  }
  
  const app = new Vue ({
    el: '#app',
    data: {
      search: '',
      postList : [
        new Post(
          'Manzanilla', 
          'https://vuejs.org/', 
          'Estómago'
        ),
        new Post(
          'Eucalipto', 
          'https://facebook.github.io/react/',
          'tos'
        ),
        new Post(
          'Ajo', 
          'https://angularjs.org/',
          'dolor muscular'
        ),
        new Post(
          'Jengibre', 
          'http://emberjs.com/', 
          'Indigestión'
        ),
        new Post(
          'Romero', 
          'https://www.meteor.com/', 
          'gripe'
        ),
        new Post(
          'Sábila', 
          'http://aurelia.io/', 
          'quemadura'
        ),
  ]
    },
    computed: {
      filteredList() {
        return this.postList.filter(post => {
          return post.illness.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  })