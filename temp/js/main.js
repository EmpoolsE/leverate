$(document).ready(function () {

	$('.widgets .col').responsiveEqualHeightGrid();
	changeQuickCurrencyType();
    $('#QuickAmount').change(function () {
        calculate()
    });
	// auto request ************************************************************
	var _input = $('div.translation div.input input[type="text"]');
	var _dropHolder = $('div.translation div.dropdown');
	var _resultEl = $('a', _dropHolder);
	var _address = _input.parents('form').attr('action');
	var _tempVal = '';
	
	_input.focus(function(){
		$(this).val('');
		$(this).parents('.input-holder').addClass('onfocus');
	});
	_input.blur(function(){
		$(this).parents('.input-holder').removeClass('onfocus');
	});
	
	_input.keyup(function(){
		var _val = $(this).val();
		if (_val != _tempVal) {
			_tempVal = _val;
			$.ajax({
				url: _address,
				data: 'request='+_val,
				success: function(html){
					_dropHolder.html('<span class="corner">&nbsp;</span>'+html);
					_dropHolder.fadeIn(300);
				}
			});
		} else {
			_dropHolder.fadeOut(300);
		}
	});
	_resultEl.on('click',function(){
        _input.val($(this).text());
        _dropHolder.fadeOut(300);
        return false;
    });
	$('body').click(function(e){
		var _close = true;
		if(!e) e = window.event;
        var _target = (e.target || e.srcElement);
		if (!$(_target).is(_dropHolder)) {
			var _parent = _target;
			for (var i=0; i<$(_target).parents().length; i++) {
				_parent = _parent.parentNode;
				if ($(_parent).is(_dropHolder)) {
					_close = false;
					break;
				}
			}
			if (_close) {
				_dropHolder.fadeOut(300);
			}
		}
		
	});
});

function changeQuickCurrencyType() {
    $.post('https://www.bwm.exchange/Home/GetQuickRate' + '?quickCurrencyTypes=' + $('#QuickCurrencyTypes option:selected').text(), function (data) {
        if (data != 0 && data != 'NaN') {
            $('#quickBuy').html(data.Bid);
            $('#quickSell').html(data.Ask);
            calculate();
        }
    });
}

function calculate() {
    if ($('#QuickCurrencyTypes option:selected').text() != '') { $('#resultMessage').show(); } else { $('#resultMessage').hide(); }

    var currency = $('#QuickCurrencyTypes option:selected').text().substring(0, 3);
    var sellCurrency = $('#QuickCurrencyTypes option:selected').text().substring(3, 6);
    var ammount = $('#QuickAmount').val();
    var sellValue = $('#quickSell').html();
    var buyValue = $('#quickBuy').html();
    if (ammount == '') {
        ammount = 1;
    }
    $('#buyValue').html(ammount);
    $('#buyCurrency').html(currency);
    $('#sellCurrency').html(sellCurrency);
    $('#sellValue').html(buyValue);
    $('#sellValue2').html(sellValue);
}

function getResults() {
    var openPrice = $('#OpenPrice').val();
    var tpPrice = $('#TPPrice').val();
    var slPrice = $('#SLPrice').val();
    $('#tooltipTPPriceH').hide();
    $('#tooltipSLPriceH').hide();
    $('#tooltipTPPriceL').hide();
    $('#tooltipSLPriceL').hide();
    $('#tooltipLot').hide();
    $('#Profit').val('');
    $('#Loss').val('');
    $('#PipValue').val('');
    $('#TPPrice').parent('div').attr('class', 'input')
    $('#SLPrice').parent('div').attr('class', 'input')
    $('#Lot').parent('div').attr('class', 'input');

    if ($('#CurrencyTypes').val() != '' && openPrice != '') {
        if ($('#Lot').val() == '') {
            $('#tooltipLot').show();
            $('#Lot').parent('div').attr('class', 'input validation-error')
            return false;
        }
        if ($('#trade-calc-sell:checked').val() == 'on') {
            if ((tpPrice == '' || tpPrice * 1 < openPrice * 1) && (slPrice == '' || slPrice * 1 > openPrice * 1)) {
                getProfit(); getLoss(); getPipValue();
            } else {
                if (tpPrice * 1 >= openPrice * 1) {
                    $('#tooltipTPPriceL').show();
                    $('#TPPrice').parent('div').attr('class', 'input validation-error')
                }
                else if (slPrice * 1 <= openPrice * 1) {
                    $('#tooltipSLPriceH').show();
                    $('#SLPrice').parent('div').attr('class', 'input validation-error')
                }

            }
        }
        if ($('#trade-calc-buy:checked').val() == 'on') {
            if ((tpPrice == '' || tpPrice * 1 > openPrice * 1) && (slPrice == '' || slPrice * 1 < openPrice * 1))
            { getProfit(); getLoss(); getPipValue(); }
            else {
                if (tpPrice * 1 <= openPrice * 1) {
                    $('#tooltipTPPriceH').show();
                    $('#TPPrice').parent('div').attr('class', 'input validation-error')
                }
                else if (slPrice * 1 >= openPrice * 1) {
                    $('#tooltipSLPriceL').show();
                    $('#SLPrice').parent('div').attr('class', 'input validation-error')
                }
            }
        }
    }
    if ($('#CurrencyTypes').val() != '' && $('#Lot').val() != '') {
        getPipValue();
    }
}

$('#TPPrice').click(function () {
    $('#tooltipTPPriceH').hide();
    $('#tooltipTPPriceL').hide();
    $('#TPPrice').parent('div').attr('class', 'input');
});

$('#SLPrice').click(function () {
    $('#tooltipSLPriceH').hide();
    $('#tooltipSLPriceL').hide();
    $('#SLPrice').parent('div').attr('class', 'input');
});

$('#Lot').click(function () {
    $('#tooltipLot').hide();
    $('#Lot').parent('div').attr('class', 'input');
});

$('#quickTab').click(function () {
    $('#tooltipTPPriceH').hide();
    $('#tooltipSLPriceH').hide();
    $('#tooltipTPPriceL').hide();
    $('#tooltipSLPriceL').hide();
    $('#tooltipLot').hide();
    $('#SLPrice').parent('div').attr('class', 'input');
    $('#TPPrice').parent('div').attr('class', 'input');
    $('#Lot').parent('div').attr('class', 'input');
});

function reset() {
    $('#tooltipTPPriceL').hide();
    $('#tooltipSLPriceL').hide();
    $('#tooltipTPPriceH').hide();
    $('#tooltipSLPriceH').hide();
    $('#tooltipLot').hide();
    $('#PipValue').val('');
    $('#TPPrice').parent('div').attr('class', 'input')
    $('#SLPrice').parent('div').attr('class', 'input')
    $('#Lot').parent('div').attr('class', 'input')
    $('#Profit').val('');
    $('#Loss').val('');
    $('#PipValue').val('');
    $('.ui-autocomplete-input').val('');
    $('#CurrencyType').val('');
    $('#CurrencyValue').val('');
    $('#OpenPrice').val('');
    $('#TPPrice').val('');
    $('#SLPrice').val('');
    $('#Lot').val('');
    $('#LotSize').val('');
    $('#ConvertType').val('');
    $('#Price2').val('');
}
function changeCurrencyType() {

    $('#CurrencyTypeValue').val($('#CurrencyTypes option:selected').text());
    if ($('#CurrencyTypes option:selected').text().indexOf("USD") == 0) {
        $('#CurrencyType').val("USD/XXX");
    }
    if ($('#CurrencyTypes option:selected').text().indexOf("USD") == 3) {
        $('#CurrencyType').val("XXX/USD");
    }
    if ($('#CurrencyTypes option:selected').text().indexOf("USD") == -1) {
        $('#CurrencyType').val("XXX/XXX");
    }
    getPrice2();
    getLotSize();
    getResults();
}


function getProfit() {
    $('#Profit').val('');
    $.post('https://www.bwm.exchange/Home/GetProfit', $('#form').serialize(), function (data) {
        if (data != 0 && data != 'NaN')
            $('#Profit').val('$  ' + data);
    });
}

function getLoss() {
    $('#Loss').val('');
    $.post('https://www.bwm.exchange/Home/GetLoss', $('#form').serialize(), function (data) {
        if (data != 0 && data != 'NaN')
            $('#Loss').val('$  ' + data);
    });
}

function getPipValue() {
    $('#PipValue').val('');
    $.post('https://www.bwm.exchange/Home/GetTradePipValue', $('#form').serialize(), function (data) {
        if (data != 0 && data != 'NaN')
            $('#PipValue').val('$  ' + data);
    });
}

function getPrice2() {
    $.post('https://www.bwm.exchange/Home/getPrice2', $('#form').serialize(), function (data) {
        $('#ConvertType').val(data.ConvertType);
        $('#Price2').val(data.Price2);
    });
}

function getLotSize() {
    $.post('https://www.bwm.exchange/Home/GetLotSize', $('#form').serialize(), function (data) {
        $('#LotSize').val(data);
    });
}
(function ($) {
    $.widget("custom.combobox", {
        _create: function () {
            this.wrapper = $("<span>")
  .addClass("custom-combobox")
  .insertAfter(this.element);

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function () {
            var selected = this.element.children(":selected"),
  value = selected.val() ? selected.text() : "";

            this.input = $("<input>")
  .appendTo(this.wrapper)
  .val(value)
  .attr("title", "")
  .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
  .autocomplete({
      delay: 0,
      minLength: 0,
      source: $.proxy(this, "_source")
  })
  .tooltip({
      tooltipClass: "ui-state-highlight"
  });

            this._on(this.input, {
                autocompleteselect: function (event, ui) {
                    ui.item.option.selected = true;
                    this._trigger("select", event, {
                        item: ui.item.option
                    });
                    changeCurrencyType();
                    changeQuickCurrencyType();
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function () {
            var input = this.input,
  wasOpen = false;

            $("<a>")
  .attr("tabIndex", -1)
  .attr("title", "Show All Items")
  .tooltip()
  .appendTo(this.wrapper)
  .button({
      icons: {
          primary: "ui-icon-triangle-1-s"
      },
      text: false
  })
  .removeClass("ui-corner-all")
  .addClass("custom-combobox-toggle ui-corner-right")
  .mousedown(function () {
      wasOpen = input.autocomplete("widget").is(":visible");
  })
  .click(function () {
      input.focus();

      // Close if already visible
      if (wasOpen) {
          return;
      }

      // Pass empty string as value to search for, displaying all results
      input.autocomplete("search", "");
  });
        },

        _source: function (request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response(this.element.children("option").map(function () {
                var text = $(this).text();
                if (this.value && (!request.term || matcher.test(text)))
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }));
        },

        _removeIfInvalid: function (event, ui) {

            // Selected an item, nothing to do
            if (ui.item) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
  valueLowerCase = value.toLowerCase(),
  valid = false;
            this.element.children("option").each(function () {
                if ($(this).text().toLowerCase() === valueLowerCase) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if (valid) {
                return;
            }

            // Remove invalid value
            this.input
  .val("")
  .attr("title", value + " didn't match any item")
  .tooltip("open");
            this.element.val("");
            this._delay(function () {
                this.input.tooltip("close").attr("title", "");
            }, 2500);
            this.input.data("ui-autocomplete").term = "";
        },

        _destroy: function () {
            this.wrapper.remove();
            this.element.show();
        }
    });
})(jQuery);

$(function () {
    $(".combobox").combobox();
});
(function($) {
  $.fn.equalHeight = function(){
    var heights = [];
    $.each(this, function(i, element){
      $element = $(element);
      var element_height;
      var includePadding = ($element.css('box-sizing') == 'border-box') || ($element.css('-moz-box-sizing') == 'border-box');
      if (includePadding) {
        element_height = $element.outerHeight();
      } else {
        element_height = $element.height();
      }
      heights.push(element_height);
    });
    this.css('height', Math.max.apply(window, heights) + 'px');
    return this;
  };
  $.fn.equalHeightGrid = function(columns){
    var $tiles = this;
    $tiles.css('height', 'auto');
    for (var i = 0; i < $tiles.length; i++) {
      if (i % columns === 0) {
        var row = $($tiles[i]);
        for(var n = 1;n < columns;n++){
          row = row.add($tiles[i + n]);
        }
        row.equalHeight();
      }
    }
    return this;
  };
  $.fn.detectGridColumns = function() {
    var offset = 0, cols = 0;
    this.each(function(i, elem) {
      var elem_offset = $(elem).offset().top;
      if (offset === 0 || elem_offset == offset) {
        cols++;
        offset = elem_offset;
      } else {
        return false;
      }
    });
    return cols;
  };
  $.fn.responsiveEqualHeightGrid = function() {
    var _this = this;
    function syncHeights() {
      var cols = _this.detectGridColumns();
      _this.equalHeightGrid(cols);  
    }
    $(window).bind('resize load', syncHeights);
    syncHeights();
    return this;
  };
})(jQuery);