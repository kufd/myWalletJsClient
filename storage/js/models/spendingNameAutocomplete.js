$.fn.spendingNameAutocomplete = function() {
	
	if(!$.fn.spendingNameAutocomplete.cache)
	{
		$.fn.spendingNameAutocomplete.cache = {};
	}
	
	var urlAutocomplete = '/v1/spendings/autocomplete/';
	var cacheAutocoplete = $.fn.spendingNameAutocomplete.cache;
	
    this.autocomplete({
		minLength: 2,
		source: function( request, response ){
			var term = request.term;

			if (term in cacheAutocoplete) 
			{
				response(cacheAutocoplete[term]);
				return;
			}

			$.ajax({
				type: "GET",
				url: urlAutocomplete,
				async: false,
				headers: myWallet.getAuthHeader(),
				data: {name: request.term},
				dataType: 'json',
				success: function(fields)
				{
					cacheAutocoplete[term] = fields;
					response(fields);
				},
				error: myWallet.processAjaxError
			});
		}
	});
	
	return this;
};