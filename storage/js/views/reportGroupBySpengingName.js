var ReportGroupBySpengingNameView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.reportGroupBySpengingName,
	
	initialize: function () {
		
    },
    
    render: function () {
		if(myWallet.isUserLoggedIn())
		{
			var template = _.template(this.template);
			this.$el.html(template);
			
			this.trigger('render');
		}
	}
});

