var TodoItemView = Backbone.View.extend({

	tagName: "li",

	className: "todoItem",

	events: {
		"click #toggle" : "onClickToggle"
	},

	initialize: function(options) {
		if(!(options && options.model)) 
			throw new Error("Model is not specified.")

		this.model.on("change", this.render, this);
	},

	onClickToggle: function(e) {
		this.model.toggle();
		console.log(this.model.toJSON())
	},

	render: function() {

		var checked = this.model.get("isCompleted") ? "checked" : "";
		this.$el.html("<input id='toggle' type='checkbox' " + checked + "></input>" + this.model.escape("description"));

		this.$el.toggleClass('completed', this.model.get('isCompleted'));

		return this;
	}
	
});