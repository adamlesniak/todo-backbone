var TodoItemsView = Backbone.View.extend({

	id: "todoItems",

	tagName: "ul",

	events: {
		"click #add" : "onClickAdd",
		"keypress #newTodoItem" : "onKeyPress"
	},
	
	initialize: function(options) {
		if(!(options && options.model)) 
			throw new Error("Model is not specified.")

		this.model.on("add",    this.onAddTodoItem, this);
		this.model.on("remove", this.onRemoveTodoItem, this);
	},

	render: function() {
		var self = this;

		this.$el.append("<input type='text' autofocus id='newTodoItem'></input>");
		this.$el.append("<button id='add'>Add</button>");

		this.model.each(function(todoItem) {
			var todoItemView = new TodoItemView({ model: todoItem });
			self.$el.append(todoItemView.render().$el);
		});

		return this;
	},

	onClickAdd: function() {
		var $textBox = this.$("#newTodoItem");

		if($textBox.val()) {
			var todoItem = new TodoItem({ description: $textBox.val() });
			this.model.add(todoItem);	
			$textBox.val('');
		}

	},

	onKeyPress: function(e) {
		if (e.keyCode == 13)
			this.onClickAdd();
	},

	onAddTodoItem: function(todoItem) {
		var view = new TodoItemView({ model: todoItem });
		this.$el.append(view.render().$el);
	},

	onRemoveTodoItem: function(todoItem) {
		this.$("li#" + todoItem.id).remove();
	}

});