var ReportGroupBySpengingNameView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.reportGroupBySpengingName,
	report: null,
	
	events: {
		"click div.reportGroupBySpengingName table.spendings th div": "sortSpendings",
	},
	
	initialize: function () {
		this.report = reportGroupBySpengingName;
		
		this.report.setDateBegin($.datepicker.formatDate('yy-mm-01', new Date()));
		this.report.setDateEnd($.datepicker.formatDate('yy-mm-'+this.countDaysOfMont(), new Date()));
    },
	
	countDaysOfMont: function()
    {
    	var date = new Date();
    	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    },
	
	sortSpendings: function(event)
	{
		var field = $(event.target).attr('data-field');
		var sortOptions = this.report.getSortOptions();
		
		if(sortOptions.field == field)
		{
			sortOptions.direction = sortOptions.direction == 'asc' ? 'desc' : 'asc';
		}
		else
		{
			sortOptions.direction = 'desc';
			sortOptions.field = field;
		}
		
		this.report.setSortOptions(sortOptions);
		
		this.render();
	},
    
    render: function () {
		if(myWallet.isUserLoggedIn())
		{
			var template = _.template(
				this.template,
				{
					data: this.report.getData(), 
					user: myWallet.user,
					sortOptions: this.report.getSortOptions()
				}
			);
			this.$el.html(template);
			
			//---------------- initializing tool panel ---------------
			var view = this;
			this.$("input[name=dateBegin]").val(this.report.getDateBegin());
			this.$("input[name=dateBeginFront]")
			.val($.datepicker.formatDate('d GG yy', new Date(this.report.getDateBegin())))
			.datepicker({
				dateFormat:'d GG yy',
				altField: this.$("input[name=dateBegin]"),
				altFormat: "yy-mm-dd",
				onClose: function(){
					view.report.setDateBegin(view.$("input[name=dateBegin]").val())
					
					view.render();
				}
			});
			
			this.$("input[name=dateEnd]").val(this.report.getDateEnd());
			this.$("input[name=dateEndFront]")
			.val($.datepicker.formatDate('d GG yy', new Date(this.report.getDateEnd())))
			.datepicker({
				dateFormat:'d GG yy',
				altField: this.$("input[name=dateEnd]"),
				altFormat: "yy-mm-dd",
				onClose: function(){
					view.report.setDateEnd(view.$("input[name=dateEnd]").val())
					
					view.render();
				}
			});
			//-------------------
			
			this.trigger('render');
		}
	}
	
});

