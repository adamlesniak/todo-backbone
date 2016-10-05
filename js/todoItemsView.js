var TodoItemsView = Backbone.View.extend({

	tagName: "ul",

	id: "todoItems",
	
	initialize: function(options) {
		if(!(options && options.model)) 
			throw new Error("Model is not specified.")
	},

	render: function() {
		var self = this;

		this.model.each(function(todoItem) {
			var todoItemView = new TodoItemView({ model: todoItem });
			self.$el.append(todoItemView.render().$el);
		});

		return this;
	}
});