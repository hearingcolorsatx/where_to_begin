/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// Text effects for lyrics
// const selectors = [
//   '#pohl p',
//   '#pohl h3',
//   '#imaginaryfriends p',
//   '#imaginaryfriends h3',
//   '#rocio p',
//   '#rocio h3'
// ];

// const lyricMotionToggle = document.querySelector('#lyricsMotionToggle');

// let lyricTweens = [];
// let headingTween = null;
// let lyricMotionEnabled = true;

// // Wrap each lyric word only once.
// function prepareLyricWords() {
//   selectors.forEach(selector => {
//     document.querySelectorAll(selector).forEach(element => {
//       if (element.dataset.fxDone) return;

//       element.dataset.fxDone = '1';

//       element.innerHTML = element.innerHTML.replace(
//         /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
//         '$1<span class="lyric-word">$2</span>'
//       );
//     });
//   });
// }

// // Start the moving lyric effect.
// function startLyricMotion() {
//   stopLyricMotion(false);

//   document.querySelectorAll('.lyric-word').forEach(word => {
//     if (word.id === 'currentYear') return;

//     const tween = gsap.to(word, {
//       x: () => Math.random() * 15 - 5,
//       y: () => Math.random() * 15 - 5,
//       duration: 5,
//       repeat: -1,
//       yoyo: true,
//       ease: 'sine.inOut'
//     });

//     lyricTweens.push(tween);
//   });

//   headingTween = gsap.to(
//     '#pohl h3, #imaginaryfriends h3, #rocio h3',
//     {
//       backgroundPosition: '-960px 0',
//       duration: 30,
//       repeat: -1,
//       ease: 'none'
//     }
//   );

//   lyricMotionEnabled = true;
//   updateMotionToggle();
// }

// // Stop the movement and optionally return everything to its original position.
// function stopLyricMotion(resetPosition = true) {
//   lyricTweens.forEach(tween => tween.kill());
//   lyricTweens = [];

//   if (headingTween) {
//     headingTween.kill();
//     headingTween = null;
//   }

//   if (resetPosition) {
//     gsap.set('.lyric-word', {
//       clearProps: 'transform'
//     });
//   }

//   lyricMotionEnabled = false;
//   updateMotionToggle();
// }

// function updateMotionToggle() {
//   if (!lyricMotionToggle) return;

//   lyricMotionToggle.setAttribute(
//     'aria-pressed',
//     String(lyricMotionEnabled)
//   );

//   lyricMotionToggle.setAttribute(
//     'aria-label',
//     lyricMotionEnabled
//       ? 'Pause lyric motion'
//       : 'Play lyric motion'
//   );

//   const label = lyricMotionToggle.querySelector('.toggle-label');

//   if (label) {
//     label.textContent = lyricMotionEnabled
//       ? "Prints of Her Lipstick"
//       : "it's the way she mover her hips";
//   }
// }

// prepareLyricWords();

// // Respect the visitor's operating-system motion preference.
// const prefersReducedMotion = window.matchMedia(
//   '(prefers-reduced-motion: reduce)'
// );

// if (prefersReducedMotion.matches) {
//   stopLyricMotion();
// } else {
//   startLyricMotion();
// }

// lyricMotionToggle?.addEventListener('click', () => {
//   if (lyricMotionEnabled) {
//     stopLyricMotion();
//   } else {
//     startLyricMotion();
//   }
// });

// End text effects for lyrics

// Typing text effect found here: (https://codepen.io/qkevinto/pen/WQVNWO/)

const resolver = {
	resolve: function resolve(options, callback) {
	  // The string to resolve
	  const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
	  const combinedOptions = Object.assign({}, options, {resolveString: resolveString});
	  
	  function getRandomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	  };
	  
	  function randomCharacter(characters) {
		return characters[getRandomInteger(0, characters.length - 1)];
	  };
	  
	  function doRandomiserEffect(options, callback) {
		const characters = options.characters;
		const timeout = options.timeout;
		const element = options.element;
		const partialString = options.partialString;
  
		let iterations = options.iterations;
  
		setTimeout(() => {
		  if (iterations >= 0) {
			const nextOptions = Object.assign({}, options, {iterations: iterations - 1});
  
			// Ensures partialString without the random character as the final state.
			if (iterations === 0) {
			  element.textContent = partialString;
			} else {
			  // Replaces the last character of partialString with a random character
			  element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
			}
  
			doRandomiserEffect(nextOptions, callback)
		  } else if (typeof callback === "function") {
			callback(); 
		  }
		}, options.timeout);
	  };
	  
	  function doResolverEffect(options, callback) {
		const resolveString = options.resolveString;
		const characters = options.characters;
		const offset = options.offset;
		const partialString = resolveString.substring(0, offset);
		const combinedOptions = Object.assign({}, options, {partialString: partialString});
  
		doRandomiserEffect(combinedOptions, () => {
		  const nextOptions = Object.assign({}, options, {offset: offset + 1});
  
		  if (offset <= resolveString.length) {
			doResolverEffect(nextOptions, callback);
		  } else if (typeof callback === "function") {
			callback();
		  }
		});
	  };
  
	  doResolverEffect(combinedOptions, callback);
	} 
  }
  
  // Modification 1 - define elements to find
  const elements = document.querySelectorAll('[link1], [link2], [link3], [link4]')

elements.forEach((element, index) => {
	const strings = [
		'About',
		'Prints of Her Lipstick',
		'Imaginary Friends',
		'Rocío'
	];

	let resolveString = '';

	if (element.hasAttribute('link1')) {
		resolveString = strings[0];
		timeout = 20;
	} else if (element.hasAttribute('link2')) {
		resolveString = strings[1];
		timeout = 5;
	} else if (element.hasAttribute('link3')) {
		resolveString = strings[2];
		timeout = 7;
	} else if (element.hasAttribute('link4')) {
		resolveString = strings[3];
		timeout = 20;
	}
// End Modification 1  

let counter = 0;

const options = {
	// Initial position
	offset: 0,
	// Timeout between each random character
	timeout: timeout,
	// Number of random characters to show
	iterations: 10,
	// Random characters to pick from
	characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
	// String to resolve
	resolveString: resolveString,
	// The element
    element: element
}
  
  // Callback function when resolve completes
function callback() {
	setTimeout(() => {	
		let nextOptions = Object.assign({}, options, {resolveString: resolveString});
		resolver.resolve(nextOptions, callback);
	}, 5000);
}

resolver.resolve(options, callback);
});
// End of typing text effect

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// Nav.
		var $nav = $header.children('nav'),
			$nav_li = $nav.find('li');

		// Add "middle" alignment classes if we're dealing with an even number of items.
			if ($nav_li.length % 2 == 0) {

				$nav.addClass('use-middle');
				$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

			}

	// Main.
		var	delay = 325,
			locked = false;

		// Methods.
			$main._show = function(id, initial) {

				var $article = $main_articles.filter('#' + id);

				// No such article? Bail.
					if ($article.length == 0)
						return;

				// Handle lock.

					// Already locked? Speed through "show" steps w/o delays.
						if (locked || (typeof initial != 'undefined' && initial === true)) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Mark as visible.
								$body.addClass('is-article-visible');

							// Deactivate all articles (just in case one's already active).
								$main_articles.removeClass('active');

							// Hide header, footer.
								$header.hide();
								$footer.hide();

							// Show main, article.
								$main.show();
								$article.show();

							// Activate article.
								$article.addClass('active');

							// Unlock.
								locked = false;

							// Unmark as switching.
								setTimeout(function() {
									$body.removeClass('is-switching');
								}, (initial ? 1000 : 0));

							return;

						}

					// Lock.
						locked = true;

				// Article already visible? Just swap articles.
					if ($body.hasClass('is-article-visible')) {

						// Deactivate current article.
							var $currentArticle = $main_articles.filter('.active');

							$currentArticle.removeClass('active');

						// Show article.
							setTimeout(function() {

								// Hide current article.
									$currentArticle.hide();

								// Show article.
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

				// Otherwise, handle as normal.
					else {

						// Mark as visible.
							$body
								.addClass('is-article-visible');

						// Show article.
							setTimeout(function() {

								// Hide header, footer.
									$header.hide();
									$footer.hide();

								// Show main, article.
									$main.show();
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

			};

			$main._hide = function(addState) {

				var $article = $main_articles.filter('.active');

				// Article not visible? Bail.
					if (!$body.hasClass('is-article-visible'))
						return;

				// Add state?
					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');

				// Handle lock.

					// Already locked? Speed through "hide" steps w/o delays.
						if (locked) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Deactivate article.
								$article.removeClass('active');

							// Hide article, main.
								$article.hide();
								$main.hide();

							// Show footer, header.
								$footer.show();
								$header.show();

							// Unmark as visible.
								$body.removeClass('is-article-visible');

							// Unlock.
								locked = false;

							// Unmark as switching.
								$body.removeClass('is-switching');

							// Window stuff.
								$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');

							return;

						}

					// Lock.
						locked = true;

				// Deactivate article.
					$article.removeClass('active');

				// Hide article.
					setTimeout(function() {

						// Hide article, main.
							$article.hide();
							$main.hide();

						// Show footer, header.
							$footer.show();
							$header.show();

						// Unmark as visible.
							setTimeout(function() {

								$body.removeClass('is-article-visible');

								// Window stuff.
									$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');

								// Unlock.
									setTimeout(function() {
										locked = false;
									}, delay);

							}, 25);

					}, delay);


			};

		// Articles.
			$main_articles.each(function() {

				var $this = $(this);

				// Close.
					$('<div class="close">Close</div>')
						.appendTo($this)
						.on('click', function() {
							location.hash = '';
						});

				// Prevent clicks from inside article from bubbling.
					$this.on('click', function(event) {
						event.stopPropagation();
					});

			});

		// Events.
			$body.on('click', function(event) {

				// Article visible? Hide.
					if ($body.hasClass('is-article-visible'))
						$main._hide(true);

			});

			$window.on('keyup', function(event) {

				switch (event.keyCode) {

					case 27:

						// Article visible? Hide.
							if ($body.hasClass('is-article-visible'))
								$main._hide(true);

						break;

					default:
						break;

				}

			});

			$window.on('hashchange', function(event) {

				// Empty hash?
					if (location.hash == ''
					||	location.hash == '#') {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Hide.
							$main._hide();

					}

				// Otherwise, check for a matching article.
					else if ($main_articles.filter(location.hash).length > 0) {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Show article.
							$main._show(location.hash.substr(1));

					}

			});

		// Scroll restoration.
		// This prevents the page from scrolling back to the top on a hashchange.
			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';
			else {

				var	oldScrollPos = 0,
					scrollPos = 0,
					$htmlbody = $('html,body');

				$window
					.on('scroll', function() {

						oldScrollPos = scrollPos;
						scrollPos = $htmlbody.scrollTop();

					})
					.on('hashchange', function() {
						$window.scrollTop(oldScrollPos);
					});

			}

		// Initialize.

			// Hide main, articles.
				$main.hide();
				$main_articles.hide();

			// Initial article.
				if (location.hash != ''
				&&	location.hash != '#')
					$window.on('load', function() {
						$main._show(location.hash.substr(1), true);
					});

})(jQuery);