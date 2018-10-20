const fakeNews = {
  mc: null,
  name: "fake-news",

  initDataSource: function(metroClient) {
    // Initialize the context-menu buttons
    this.mc = metroClient;
    this.createHighlightButton();
    this.createArticleButton();
  },

  getAuthor: function() {
    // Tries to find the author of the article from the webpage
    var info = document.getElementsByTagName('META');

    for (var i=0;i<info.length;i++) {
      if (info[i].getAttribute('name') != null && info[i].getAttribute('name').toLowerCase().includes('author')) {
        author = info[i].getAttribute('CONTENT');
        return author;
      }
    }
  },

  sendHighlight: function(contextInfo) {
    // Runs when a user indicates that the highlighted text is "fake news"
    var text = contextInfo['selectionText'];
    var valid = this.validateInput(text);

    if(valid['status'] == 1) {
      let datapoint = {
        text: text,
        type: 'highlight',
        author: this.getAuthor()
      };

      console.log(datapoint);

      this.mc.sendDatapoint(datapoint);
    }

    return resp;
  },

  sendArticle: function() {
    // Runs when a user indicates that an article is "fake news"
    // Creates a modal form to ask for information from the user
    // ...and then sends the datapoint with the modal data and the URL
    this.mc.createModalForm({
      inputs: [
        {
          description: 'Inaccuracy Type',
          type: 'select',
          options: [
            {text : 'False Connection', val: 'false_connection'},
            {text : 'Misleading Content', val: 'misleading_content'},
            {text : 'Impersonated Source', val: 'impersonated_source'},
            {text : 'Fabricated Content', val: 'fabricated_content'},
            {text : 'False Context', val: 'false_context'},
            {text : 'Manipulated Content', val: 'manipulated_content'},
          ]
        },
        {
          description: 'Article topic',
          type: 'input'
        },
        {
          description: 'Author',
          type: 'input',
//          initial: getAuthor() // TODO: Allow initial values for input fields
        },
      ],
      submitCallback: function(info) {
        // Callback runs when the user submits the modal form
        // Receives one argument: the text input from the user

        let datapoint = {
          url: window.location.href,
          inaccuracy_type: info['inputs'][0],
          topic: info['inputs'][1],
          author: info['inputs'][2],
          type: 'article'
        };

        console.log(datapoint);

        this.mc.sendDatapoint(datapoint);
      }.bind(this)
    });
  },

  validateInput: function(text) {
    // Validate the highlighted text
    if(text.includes(' ')) {
      var resp = {
        'status': 0,
        'msg': 'Please select one word at a time.'
      }
    } else {
      var resp = {
        'status': 1,
        'msg': 'Success!'
      };
    }

    return resp;
  },

  createHighlightButton: function() {
    // Context-menu button for highlighted text
    this.mc.createContextMenuButton({
      functionName: 'fakeHighlightFunction',
      buttonTitle: 'Fake News - Sentence',
      contexts: ['selection']
    }, this.sendHighlight.bind(this));
  },

  createArticleButton: function() {
    // Context-menu button for right-clicking anywhere on the page
    this.mc.createContextMenuButton({
      functionName: 'fakeArticleFunction',
      buttonTitle: 'Fake News - Article',
      contexts: ['page']
    }, this.sendArticle.bind(this));
  }
}

registerDataSource(fakeNews);
