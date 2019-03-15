const disneyCharacterData = [
  {name: 'Mickey', race: 'Mouse'},
  {name: 'Donald', race: 'Duck'},
  {name: 'Pinocchio', race: 'Doll'},
  {name: 'Winnie the Pooh', race: 'Bear'}
];

const DisneyModel = Backbone.Model.extend({
  // default property
  defaults: {
    name: null, race: null,
    edit: false, editName: null, editRace: null
  },
  // edit list element
  editCharacterModel: function() {
    this.set({
      edit: true,
      formName: this.get('name'),
      formRace: this.get('race')
    });
  },
  saveEditModel: function() {
    this.set({
			edit: false,
			name: this.get('formName'),
			race: this.get('formRace')
		});
  }
});

const DisneyCollection =  Backbone.Collection.extend  ({
  model: DisneyModel
});
let disneyCollection = new DisneyCollection(disneyCharacterData);

const DisneyView =  Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  tagName: 'li',
  render: function() {
    //  ✔️   ✖️
    let name = this.model.get('name');
    let race = this.model.get('race');
    let iconEdit = `<span class="editCharacter"> ✍🏻 </span>`
    let saveEdit = `<span class="saveEditCharacter">✔️ </span>`
    let iconDelete = `<span class="deleteCharacter"> 🗑 </span>`
    let htmlContent;
    if (this.model.get('edit') === true) {
      let formName = this.model.get('formName');
  		let formRace = this.model.get('formRace');
      htmlContent = `<input class="changeName" value="${formName}"></input>
      <input class="changeRace" value="${formRace}"></input> ${saveEdit}`
    } else {
      htmlContent = `<li>The character ${name} is a ${race} ${iconEdit} ${iconDelete}</li>`;
    }

    this.$el.html(htmlContent);
  },
  events: {
    'click .editCharacter': 'editCharacter',
    'click .saveEditCharacter': 'saveEdit',
    'click .deleteCharacter': 'deleteCharacter',
    'change .changeName': 'saveChangesName',
    'change .changeRace': 'saveChangesRace'
  },
  editCharacter: function(event) {
    this.model.editCharacterModel();
  },
  saveEdit: function(event) {
    this.model.saveEditModel();
  },
  deleteCharacter: function(event) {
    disneyCollection.remove(this.model);
  },
  saveChangesName: function() {
    this.model.set({formName: event.target.value})
  },
  saveChangesRace: function() {
    this.model.set({formRace: event.target.value})
  }
});

const DisneyViewList = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'update', this.render);
  },
  render: function() {
    let el = this.$el;
    let ul = $('<ul></ul>');
    el.html('')
    this.collection.forEach(function(disneyCharacterData) {
      let disneyView = new DisneyView({model: disneyCharacterData});
      disneyView.render();
      ul.append(disneyView.$el);
    });
    let addCharacterContent = `<input class="addNewName" placeholder="Add name"/>
    <input class="addNewRace" placeholder="Add Race"/>
    <button class="addNewCharacter">Add Character</button>`;
    el.append(ul);
    el.append(addCharacterContent);
  },
  events: {
    'click .addNewCharacter': 'addNewCharacter',
    'change .addNewName': 'addNewName',
    'change .addNewRace': 'addNewRace'
  },

  addNewCharacter: function(event) {
    console.log('add.addNewCharacter func', this.newForm.name, this.newForm.race);
    let addNewView = new DisneyModel({
      name: this.newForm.name,
      race: this.newForm.race
    });
    this.collection.add(addNewView);
  },
  newForm: { name: '', race: '' },
  addNewName: function(event) { this.newForm.name = event.target.value; },
  addNewRace: function(event) { this.newForm.race = event.target.value; }
});


$(document).ready(function() {
  let disneyViewList = new DisneyViewList({
    collection: disneyCollection,
    el: '#characterContent'
  });
  disneyViewList.render();
});
