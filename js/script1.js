const LoginToAcess = Backbone.Model.extend({
  defaults: {
    state: false
  },
  toggleLogOutIn: function() {
    let signInValue = this.get('state');
    this.set({state: !signInValue});
  }
});

const LoginToAcessView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },
  render: function() {
    let elementsToLogin;
    if( this.model.get('state') === true ) {
      elementsToLogin = `<span>Du är inloggad!</span> <button id="signIn">Logga ut</button>`;
      this.$el.html(elementsToLogin);
    } else {
      elementsToLogin = `<span>Du är utloggad!</span> <button id="signOut">Logga in</button>`;
      this.$el.html(elementsToLogin);
    }
  },
  events: {
    'click button': 'toggleAcess'
  },
  toggleAcess: function(event) {
    this.model.toggleLogOutIn()
    }
});


let loginModel = new LoginToAcess ({});
let loginView = new LoginToAcessView ({
  model: loginModel
});

$(document).ready(function() {

  $('#loginDiv').append(loginView.$el);
  loginView.render();
});
