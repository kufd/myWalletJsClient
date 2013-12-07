var FormAddSpendingView = Backbone.View.extend({
	el: 'body',
	template: myWallet.templates.formAddSpending,
	
	render: function () {
		var view = this;
		var template = _.template(this.template);
		this.$el.append(template);
		
		this.$("input[name=dateFront]").datepicker({
			dateFormat:'d GG yy',
			altField: this.$("input[name=date]"),
			altFormat: "yy-mm-dd",
		});
		
		this.$('div.formAddSpending').dialog({
			buttons:
				[ 
					{
		               	text: "Зберегти",
		               	click: function() { view.saveSpending(); }
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
	
	saveSpending: function(){
		myWallet.views.spendings.addSpending({
			spendingName: this.$("input[name=spendingName]").val(),
			amount: this.$("input[name=amount]").val(),
			date: this.$("input[name=date]").val(),
		});
		
		this.remove(); 
	}
});

