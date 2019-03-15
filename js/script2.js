const TabsMenu = Backbone.Model.extend({
  defaults: {
    selectedTab: 0
  }
});

// create a view for tabs
const TabsMenuView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },
  render: function() {
    let tabsElement = '';
    let numberOfTabs = 4;
    const titles = ['space', 'worm', 'tree', 'squirrelShopping'];
    for(let i=0; i<numberOfTabs; i++) {
      let selectedClass = '';

      if( i == this.model.get('selectedTab') ) {
        selectedClass = 'selected';
      }

      tabsElement += `<li class="tab${i} ${selectedClass}">${titles[i]}</li>`;
    }

    viewPage = new PageContentView({
      model: tabsModel
    });
    const listOfImg = [
      '<img class="tabsPicture" src="/blackHole.jpeg" alt="Black Hole"/>',
      '<img class="tabsPicture" src="/tapeworm.jpeg" alt="Happy worm">',
      '<img class="tabsPicture" src="/lonelyTree.jpg" alt="Lonely tree">',
      '<img class="tabsPicture" src="/squirrelShopping.jpg" alt="Squirrel out shopping">'
    ];
    for (let j = 0; j<listOfImg.length; j++) {
      if ( this.model.get('selectedTab') == j) {
        let contentPage = listOfImg[j];

        viewPage.render(contentPage)
      }
    }

    this.$el.html(tabsElement);
    this.$el.append(viewPage.$el);
  },
  events: {
    'click .tab0': 'enterPage1',
    'click .tab1': 'enterPage2',
    'click .tab2': 'enterPage3',
    'click .tab3': 'enterPage4'
  },
  enterPage1: function(event){
    this.model.set({ selectedTab: 0 });
  },
  enterPage2: function(event){
    this.model.set({ selectedTab: 1 });
  },
  enterPage3: function(event){
    this.model.set({ selectedTab: 2 });
  },
  enterPage4: function(event){
    this.model.set({ selectedTab: 3 });
  }
});

const PageContentView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },
  render: function(content) {
    let contentImg = content;
    let changeTabButton = `<button class="swipeLeftBtn">Swipe Left</button> <button class="swipeRightBtn">Swipe right</button>`;
    this.$el.html(contentImg + changeTabButton);
  },
  events: {
    'click .swipeLeftBtn': 'swipeLeft',
    'click .swipeRightBtn': 'swipeRight'
  },
  swipeLeft: function(event) {
    if (this.model.get('selectedTab') == 0) {
      this.model.set({ selectedTab: 3 });
    } else {
      this.model.set({selectedTab: this.model.get('selectedTab') - 1})
    }
  },
  swipeRight: function(event) {
    if (this.model.get('selectedTab') == 3) {
      this.model.set({ selectedTab: 0 });
    } else {
      this.model.set({selectedTab: this.model.get('selectedTab') + 1})
    }
  }
});

// create instans (modelobject) for tabs
let tabsModel = new TabsMenu({});
let tabsView = new TabsMenuView({
  model: tabsModel
});

// when load are done
$(document).ready( function() {
  $('#tabsHeader').append(tabsView.$el)
  tabsView.render();
});













//
