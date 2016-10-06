var TodoItemView = Backbone.View.extend({

	tagName: "li",

	className: "todoItem",

	events: {
		"click #toggle" : "onClickToggle",
		"click #delete" : "onClickDelete"
	},

	initialize: function(options) {
		if(!(options && options.model)) 
			throw new Error("Model is not specified.")

		this.model.on("change", this.render, this);
	},

	onClickToggle: function(e) {
		this.model.toggle();
		this.model.save();
	},

	onClickDelete: function() {
		this.model.destroy();
	},

	render: function() {

		var checked = this.model.get("completed") ? "checked" : "";

		this.$el.attr("id", this.model.get("id"));
		this.$el.html("<input id='toggle' type='checkbox' " + checked + "></input>" + this.model.escape("title") + "<button id='delete'>Delete</button>");

		this.$el.toggleClass('completed', this.model.get('completed'));

		return this;
	}
	
});