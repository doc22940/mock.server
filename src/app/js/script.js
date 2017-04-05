
/* global window, document, hljs, JSONFormatter, jQuery */

((($) => {
	$(document).ready(function () {

		$('.page-header pre code, .top-resource-description pre code').each(function (i, block) {
			hljs.highlightBlock(block);
		});

		$('[data-toggle]').click(function () {
			var selector = $(this).data('target') + ' pre code';

			$(selector).each(function (i, block) {
				hljs.highlightBlock(block);
			});
		});

		$('.js-format-json').each(function () {
			var $elem = $(this);
			var jsonData = JSON.parse($('.js-format-json__json', $elem).html());
			var formatter = new JSONFormatter(jsonData, 2);

			$('.js-format-json__outlet-formatted', $elem).html(formatter.render());
		});

		$('[data-load-code-url]').click(function () {
			var path = $(this).data('load-code-url');
			var selector = $(this).attr('href') + ' pre code';

			$.ajax({
				url: '/service/mock-preview',
				dataType: 'text',
				data: {
					path: path,
				},
				cache: false,
				success: function (data) {
					$(selector).html(data).each(function (i, block) {
						hljs.highlightBlock(block);
					});
				},
			});
		});

		/**
		 * @param {Object} event - the click event object
		 * @returns {void}
		 * @private
		 */
		function _storeSettings(event) {
			var $ipt = $(event.currentTarget);
			var $form = $ipt.closest('.js-form-change-save');

			event.preventDefault();

			$ipt.attr('data-status', 'saving');

			$.ajax({
				url: $form.attr('action'),
				type: $form.attr('method'),
				data: {
					key: $ipt.attr('name'),
					value: $ipt.val(),
				},
				success: function () {
					$ipt.attr('data-status', 'saved');
				},
				error: function () {
					$ipt.attr('data-status', 'error');
				},
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
					path: $radio.data('path'),
				},
			});

		});

		/**
		 * @param {Array} data - list of messages
		 * @returns {Array} dom elements
		 * @private
		 */
		function getLogRows(data) {
			var type;
			var out;

			if (data instanceof Array && data.length > 0) {
				out = data.map(function (msg) {

					switch (msg.type) {
						case 'error':
							type = 'danger';
							break;
						case 'warn':
							type = 'warning';
							break;
						case 'neutral':
							type = 'active';
							break;
						default:
							type = msg.type;
							break;
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
			var $btn = $(event.currentTarget);
			var $mBody = $btn.closest('.modal-body');
			var $outlet = $('.js-swagger-import-outlet', $mBody);
			var $result = $('.js-swagger-import-outlet-result', $mBody);

			$btn.remove();
			$outlet.html('Loading ...');

			$.ajax({
				url: '/service/swagger-import',
				type: 'get',
				success: function (data) {
					$result.html(getLogRows(data));
					$outlet.html('<a href="/" class="btn btn-lg btn-primary">Reload</a>');
				},
			});
		});

		$('.js-open-validation-result').on('click', function (event) {
			var $btn = $(event.currentTarget);
			var $modal = $($btn.data('target'));
			var $result = $('.js-outlet-result', $modal);

			$result.html(getLogRows(window.validationResult));
		});

		$('.js-validate-single').on('click', function (event) {
			event.preventDefault();

			var $btn = $(event.currentTarget);
			var $modal = $('#_modal_validate_single');
			var $outlet = $('.js-outlet', $modal);
			var $result = $('.js-outlet-result', $modal);

			$modal.modal();
			$outlet.html('Loading ...');

			$.ajax({
				url: '/service/validation/response',
				type: 'get',
				data: {
					path: $btn.data('path'),
					method: $btn.data('method'),
					expected: $btn.data('expected'),
				},
				success: function (data) {
					$result.html(getLogRows(data));
					$outlet.html('<a href="/" class="btn btn-lg btn-primary">Reload</a>');
				},
			});

		});

		$('.js-validate').on('click', function (event) {
			event.preventDefault();

			var $modal = $('#_modal_validate');
			var $outlet = $('.js-outlet', $modal);
			var $result = $('.js-outlet-result', $modal);

			$modal.modal();
			$outlet.html('Loading ...');

			$.ajax({
				url: '/service/validation/responses',
				type: 'get',
				success: function (data) {
					$result.html(getLogRows(data));
					$outlet.html('<a href="/" class="btn btn-lg btn-primary">Reload</a>');
				},
			});

		});
	});
})(jQuery));
