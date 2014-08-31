var ReportAmountByPeriodView = Backbone.View.extend({
	el: '#page',
	template: myWallet.templates.reportAmountByPeriod,
	report: null,
	chart: null,
	
	events: {
	},
	
	initialize: function () {
		this.report = reportAmountBySpenging;
		
		this.report.setDateBegin($.datepicker.formatDate('yy-01-01', new Date()));
		this.report.setDateEnd($.datepicker.formatDate('yy-mm-dd', new Date()));
		this.report.setGroupByPeriod('month');
    },
	
	render: function () {
		if(myWallet.isUserLoggedIn())
		{
			var template = _.template(
				this.template,
				{
				}
			);
			this.$el.html(template);
			
			//---------------- initializing tool panel ---------------
			var view= this;
			
			this.$("input[name=dateBegin]").val(this.report.getDateBegin());
			this.$("input[name=dateBeginFront]")
			.val($.datepicker.formatDate('d GG yy', new Date(this.report.getDateBegin())))
			.datepicker({
				dateFormat:'d GG yy',
				altField: this.$("input[name=dateBegin]"),
				altFormat: "yy-mm-dd",
				onClose: function(){
					view.report.setDateBegin(view.$("input[name=dateBegin]").val());
					view.renderChart();
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
					view.report.setDateEnd(view.$("input[name=dateEnd]").val());
					view.renderChart();
				}
			});
			
			this.$("select[name=groupByPeriod]").val(this.report.getGroupByPeriod());
			this.$("select[name=groupByPeriod]").change(function(){
				view.report.setGroupByPeriod($(this).val());
				view.renderChart();
			});
			
			this.$("input[name=spendingName]").spendingNameAutocomplete();
			this.$("input[name=spendingName]").on("autocompleteclose", function(event, ui) { console.log(1); $(this).blur(); });
			this.$("input[name=spendingName]").val(this.report.getSpendingName() ? this.report.getSpendingName() : '');
			this.$("input[name=spendingName]").blur(function(){
				view.report.setSpendingName($(this).val() ? $(this).val() : null);
				view.renderChart();
			});
			//-------------------
			
			this.trigger('render');
			
			view.renderChart();
		}
	},
	
	renderChart: function() {
		
		if(this.chart)
		{
			this.chart.destroy();
			this.chart.clear();
		}
		
		if(!this.report.getData().length)
		{
			myWallet.msg('Для вказаних умов даних не знайдено');
		}
		else
		{
			var ctx = this.$("canvas.chart").get(0).getContext("2d");
			var lineChart = new Chart(ctx).Line(
				this.report.getDataForChart(), 
				{animation: false}
			);

			this.chart = lineChart;
		}
	}
	
});

