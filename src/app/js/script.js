$(document).ready(function() {

	$('.page-header pre code, .top-resource-description pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});

	$('[data-toggle]').click(function() {
		var selector = $(this).data('target') + ' pre code';

		$(selector).each(function(i, block) {
			//console.dir(block);
			hljs.highlightBlock(block);
		});
	});

	$('.js-format-json').each(function () {
		var $elem = $(this),
			jsonData = JSON.parse($('.js-format-json__json', $elem).html()),
			formatter = new JSONFormatter(jsonData, 2);

		$('.js-format-json__outlet-formatted', $elem).html(formatter.render());
	});

	$('[data-load-code-url]').click(function() {
		var path = $(this).data('load-code-url'),
			selector = $(this).attr('href') + ' pre code';

		$.ajax({
			url: '/service/mock-preview',
			dataType: 'text',
			data: {
				path: path
			},
			cache: false,
			success: function (data) {
				$(selector).html(data).each(function(i, block) {
					hljs.highlightBlock(block);
				});
			}
		});
	});

	/**
	 *
	 * @method _storeSettings
	 * @param {object} event
	 * @private
	 */
	function _storeSettings (event) {
		var $ipt = $(event.currentTarget),
			$form = $ipt.closest('.js-form-change-save');

		event.preventDefault();

		$ipt.attr('data-status', 'saving');

		$.ajax({
			url: $form.attr('action'),
			type: $form.attr('method'),
			data: {
				key: $ipt.attr('name'),
				value: $ipt.val()
			},
			success: function () {
				$ipt.attr('data-status', 'saved');
			},
			error: function () {
				$ipt.attr('data-status', 'error');
			}
		});
	}

	$('.js-form-change-save').on('submit', _storeSettings);

	$('.js-form-change-save input').
		on('keydown', function (event) {
			$(event.currentTarget).attr('data-status', 'not-saved');
		}).
		on('change', _storeSettings)
	;

	$('.js-change-response-data').on('change', function (event) {
		var $radio = $(event.currentTarget);

		$.ajax({
			url: '/service/expected-response',
			type: 'post',
			data: {
				value: $radio.val(),
				path: $radio.data('path')
			}
		});

	});

	function getLogRows (data) {
		var type,
			out;

		if (data instanceof Array && data.length > 0) {
			out = data.map(function (msg) {

				if (msg.type === 'error') {
					type = 'danger';
				} else if (msg.type === 'warn') {
					type = 'warning';
				} else if (msg.type === 'neutral') {
					type = 'active';
				} else {
					type = msg.type;
				}

				return '' +
					'<tr>' +
					'<td class="' + type + '" style="width:6px;padding:0;"></td>' +
					'<td>' + msg.time + '</td>' +
					'<td>' + msg.msg + '</td>' +
					'</tr>';
			});
		}

		return out;
	}

	$('.js-swagger-import-run').on('click', function (event) {
		var $btn = $(event.currentTarget),
			$mBody = $btn.closest('.modal-body'),
			$outlet = $('.js-swagger-import-outlet', $mBody),
			$result = $('.js-swagger-import-outlet-result', $mBody);

		$btn.remove();
		$outlet.html('Loading ...');

		$.ajax({
			url: '/service/swagger-import',
			type: 'get',
			success: function (data) {
				$result.html(getLogRows(data));
				$outlet.html('<a href="/" class="btn btn-lg btn-primary">Reload</a>');
			}
		});
	});

	$('.js-validate-single').on('click', function (event) {
		event.preventDefault();

		var $btn = $(event.currentTarget),
			$modal = $('#_modal_validate_single'),
			$outlet = $('.js-outlet', $modal),
			$result = $('.js-outlet-result', $modal);

		$modal.modal();
		$outlet.html('Loading ...');

		$.ajax({
			url: '/service/validation/response',
			type: 'get',
			data: {
				path: $btn.data('path'),
				method: $btn.data('method'),
				expected: $btn.data('expected')
			},
			success: function (data) {
				$result.html(getLogRows(data));
				$outlet.html('<a href="/" class="btn btn-lg btn-primary">Reload</a>');
			}
		});

	});

	$('.js-validate').on('click', function (event) {
		event.preventDefault();

		var $modal = $('#_modal_validate'),
			$outlet = $('.js-outlet', $modal),
			$result = $('.js-outlet-result', $modal);

		$modal.modal();
		$outlet.html('Loading ...');

		$.ajax({
			url: '/service/validation/responses',
			type: 'get',
			success: function (data) {
				$result.html(getLogRows(data));
				$outlet.html('<a href="/" class="btn btn-lg btn-primary">Reload</a>');
			}
		});

	});
});