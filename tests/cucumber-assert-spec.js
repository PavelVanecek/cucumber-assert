var cucumberAssert = require('../index.js');
var assert = require('assert');

describe('cucumber-assert tests', function() {
	var cucumberCallback = function() {

	};

	cucumberCallback.fail = function() {

	};

	var callbackSpy = {
		callback: cucumberCallback
	};

	describe('#equal', function() {
		it('calls the actual assert with all the params', function () {
			spyOn(assert, 'equal');

			var actual = 'someRandomString';
			var expected = 'someRandomString';
			var message = 'Some failure message';

			cucumberAssert.equal(actual, expected, cucumberCallback, message);
			expect(assert.equal).toHaveBeenCalledWith(actual, expected, message);
		});

		it('calls the callback function', function() {
			spyOn(callbackSpy, 'callback');

			cucumberAssert.equal('Heyyyyy, hermano.', 'Heyyyyy, hermano.', callbackSpy.callback, 'There are dozens of us! DOZENS!');
			expect(callbackSpy.callback).toHaveBeenCalled();
		});

		describe('calls the fail callback when assert was not successful', function() {
			it ('uses the exception message', function() {
				spyOn(callbackSpy.callback, 'fail');
				cucumberAssert.equal('Big Bear', 'Bob Loblaw Law Blog.', callbackSpy.callback);
				expect(callbackSpy.callback.fail).toHaveBeenCalledWith('"Big Bear" == "Bob Loblaw Law Blog."');
			});

			it('uses the provided message', function() {
				spyOn(callbackSpy.callback, 'fail');
				var message = 'Heart attack never stopped old Big Bear.';
				cucumberAssert.equal('Big Bear', 'Bob Loblaw Law Blog.', callbackSpy.callback, message);
				expect(callbackSpy.callback.fail).toHaveBeenCalledWith(message);
			});
		});
	});

	describe('#notEqual', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'notEqual');
			var actual = 'No, it\'s the opposite.';
			var expected = 'Perhaps you remember Neuterfest?';
			var message = 'Moms are such a pain in the ass, huh?';
			cucumberAssert.notEqual(actual, expected, cucumberCallback, message);
			expect(assert.notEqual).toHaveBeenCalledWith(actual, expected, message);
		});
	});

	describe('#deepEqual', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'deepEqual');
			var actual = {"foo": "bar", "random": "object"};
			var expected = {"foo": "bar", "random": "object"};
			var message = 'Wow. You, sir, are a mouthful';
			cucumberAssert.deepEqual(actual, expected, cucumberCallback, message);
			expect(assert.deepEqual).toHaveBeenCalledWith(actual, expected, message);
		});
	});

	describe('#notDeepEqual', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'notDeepEqual');
			var actual = {"foo": "nope", "random": "Lungaharing"};
			var expected = {"foo": "bar", "random": "object"};
			var message = 'Are you going to make dancing illegal?';
			cucumberAssert.notDeepEqual(actual, expected, cucumberCallback, message);
			expect(assert.notDeepEqual).toHaveBeenCalledWith(actual, expected, message);
		});
	});

	describe('#strictEqual', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'strictEqual');
			var actual = function() { return 'But where did the lighter fluid come from?'};
			var expected = 'But where did the lighter fluid come from?';
			var message = 'Do the right thing here.';
			cucumberAssert.strictEqual(actual, expected, cucumberCallback, message);
			expect(assert.strictEqual).toHaveBeenCalledWith(actual, expected, message);
		});
	});

	describe('#notStrictEqual', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'notStrictEqual');
			var actual = new function() { return 'If I wanted something your thumb touched I\'d eat the inside of your ear. '};
			var expected = new function() { return 'If I wanted something your thumb touched I\'d eat the inside of your ear. '};
			var message = 'I\'ve always been deeply passionate about nature. ';
			cucumberAssert.notStrictEqual(actual, expected, cucumberCallback, message);
			expect(assert.notStrictEqual).toHaveBeenCalledWith(actual, expected, message);
		});
	});

	describe('#throws', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'throws');
			var block = function() { };
			var error = Error;
			var message = 'I\'m good and ready.';
			cucumberAssert.throws(block, cucumberCallback, error, message);
			expect(assert.throws).toHaveBeenCalledWith(block, error, message);
		});

		it('calls the callback', function() {
			spyOn(callbackSpy, 'callback');
			var block = function() { throw new Error(); };
			var error = Error;
			var message = 'I\'m good and ready.';
			cucumberAssert.throws(block, callbackSpy.callback, error, message);
			expect(callbackSpy.callback).toHaveBeenCalled();
		});

		describe('calls the fail callback when assert was not successful', function() {
			it('uses the message provided', function() {
				spyOn(callbackSpy.callback, 'fail');
				var block = function () {};
				var error = 'You could hump that hood.';
				var message = 'I see you\'ve wasted no time in filling my seat hole.';
				cucumberAssert.throws(block, callbackSpy.callback, error, message);
				expect(callbackSpy.callback.fail).toHaveBeenCalledWith(message);
			});

			it('uses the exception message if no message is provided', function() {
				spyOn(callbackSpy.callback, 'fail');
				var block = function () {};
				var error = 'You can always tell a Milford man.';
				cucumberAssert.throws(block, callbackSpy.callback, error);
				expect(callbackSpy.callback.fail).toHaveBeenCalledWith('Missing expected exception. You can always tell a Milford man.');
			});
		});
	});

	describe('#doesNotThrow', function() {
		it('calls the actual assert with all the params', function () {
			spyOn(assert, 'doesNotThrow');
			var block = function () {};
			var message = 'Maybe it\'s not for us.';
			cucumberAssert.doesNotThrow(block, cucumberCallback, message);
			expect(assert.doesNotThrow).toHaveBeenCalledWith(block, message);
		});

		it('calls the callback', function() {
			spyOn(callbackSpy, 'callback');
			var block = function () {};
			var message = 'Maybe it\'s not for us.';
			cucumberAssert.doesNotThrow(block, callbackSpy.callback, message);
			expect(callbackSpy.callback).toHaveBeenCalled();
		});

		describe('calls the fail callback when assertion was not successful', function() {
			it('uses the message provided', function() {
				spyOn(callbackSpy.callback, 'fail');
				var block = function() { throw('She\'s a contestant') };
				var message = 'Stack the chafing dishes outside by the mailbox.';
				cucumberAssert.doesNotThrow(block, callbackSpy.callback, message);
				expect(callbackSpy.callback.fail).toHaveBeenCalledWith(message);
			});

			it('uses a custom message if no message is provided', function() {
				spyOn(callbackSpy.callback, 'fail');
				var block = function() { throw('She\'s a contestant') };
				cucumberAssert.doesNotThrow(block, callbackSpy.callback);
				expect(callbackSpy.callback.fail).toHaveBeenCalledWith('Caught exception where there was supposed to be none.');
			});
		});
	});

	describe('#ifError', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'ifError');
			var value = true;
			cucumberAssert.ifError(value, cucumberCallback);
			expect(assert.ifError).toHaveBeenCalledWith(value);
		});

		it('calls the callback', function() {
			spyOn(callbackSpy, 'callback');
			cucumberAssert.ifError(false, callbackSpy.callback);
			expect(callbackSpy.callback).toHaveBeenCalled();
		});

		describe('calls the fail callback when assertion was not successful', function() {
			it('uses the provided message', function() {
				spyOn(callbackSpy.callback, 'fail');
				var message = 'I may have committed some light treason.';
				cucumberAssert.ifError(true, callbackSpy.callback, message);
				expect(callbackSpy.callback.fail).toHaveBeenCalledWith(message);
			});

			it('uses a custom error message if no message is provided', function() {
				spyOn(callbackSpy.callback, 'fail');
				cucumberAssert.ifError(true, callbackSpy.callback);
				expect(callbackSpy.callback.fail).toHaveBeenCalledWith('Expected value to be false, true provided.');
			});
		});
	});
});