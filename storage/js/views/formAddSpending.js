var FormAddSpendingView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.formAddSpending,
	
	render: function () {
		var view = this;
		var template = _.template(this.template);
		this.$el.append(template);
		
		this.$("input[name=date]").datepicker({
			dateFormat:'d MM yy'
		});
		
		this.$('div.formAddSpending').dialog({
			buttons:
				[ 
					{
		               	text: "Зберегти",
		               	click: function() { view.remove(); }
					},
				 	{
				 		text: "Відмінити",
				 		click: function() { view.remove(); }
				 	}
				],
			close: function() { view.remove(); },
			modal: true,
			width: 320
		});
	},
	
	remove: function () {
		$('div.formAddSpending').remove();
	},
});

