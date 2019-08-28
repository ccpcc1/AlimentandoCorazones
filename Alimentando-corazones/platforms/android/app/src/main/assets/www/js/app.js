var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'AlimentandoCorazones',
  // App id
  id: 'com.alimentando.corazones',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/login/',
      url: 'index.html',
      on: {
        pageBeforeIn: function (event, page) {
          // do something before page gets into the view
        },
        pageAfterIn:function () {
          
          // do something after page gets into the view
        },
        pageInit: function () {
          
          
          // do something when page initialized
        },
        pageBeforeRemove: function (event, page) {
          // do something before page gets removed from DOM
        },
      },
    },
    {
      path: '/registro/',
      url: 'registro.html',
      on: {
        pageBeforeIn: function (event, page) {
          // do something before page gets into the view
        },
        pageAfterIn:function () {
          registar();
          salir();
          
        console.log("termino el script registro");
          // do something after page gets into the view
        },
        pageInit: function () {
          
          
          // do something when page initialized
        },
        pageBeforeRemove: function (event, page) {
          // do something before page gets removed from DOM
        },
      },
    },    
  ],
  // ... other parameters
});

var mainView = app.views.create('.view-main');


     
      
