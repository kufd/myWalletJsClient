var FormAddSpendingView = Backbone.View.extend({
	el: 'body',
	template: myWallet.templates.formAddSpending,

	initialize: function () {
		
		var form = this;
		
		myWallet.views.spendings.bind(
			'spending:save:success', 
			function(){ 
				form.remove();
			}
		);
    },
	
	render: function (spending) {
		var view = this;
		var template = _.template(this.template);
		this.$el.append(template);
		
		if(spending instanceof Spending)
		{
			this.$("input[name=spendingName]").val(spending.get('spendingName'));
			this.$("input[name=amount]").val(spending.get('amount'));
			this.$("input[name=date]").val(spending.get('date'));
			this.$("input[name=dateFront]").val($.datepicker.formatDate('d GG yy', new Date(spending.get('date'))));
			this.$("input[name=spendingId]").val(spending.get('id'));
		}
		else
		{
			this.$("input[name=date]").val($.datepicker.formatDate('yy-mm-dd', new Date()));
			this.$("input[name=dateFront]").val($.datepicker.formatDate('d GG yy', new Date()));
		}
		
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
		myWallet.views.spendings.saveSpending(
			this.$("input[name=spendingId]").val(),
			{
				spendingName: this.$("input[name=spendingName]").val(),
				amount: this.$("input[name=amount]").val().replace(',', '.'),
				date: this.$("input[name=date]").val()
			}
		);
	}
});

