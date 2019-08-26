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
    },
    {
      path: '/registro/',
      url: 'registro.html',
    },    
  ],
  // ... other parameters
});

var mainView = app.views.create('.view-main');
