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

		this.$el.attr("id", this.model.get("id"));
		this.$el.toggleClass('completed', this.model.get('completed'));

		var template = $("#todoItemTemplate").html();
		var html = Mustache.render(template, this.model.toJSON());
		this.$el.html(html);

		return this;
	}
	
});