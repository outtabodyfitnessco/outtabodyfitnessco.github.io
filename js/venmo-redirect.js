/* Venmo redirect script (OS-aware) */
(function () {
  function getVenmoLink(baseUrl) {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    // iOS detection
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
      // Venmo iOS app link
      return baseUrl.replace(
        "https://account.venmo.com/pay",
        "venmo://paycharge"
      );
    }
    // Android detection
    if (/android/i.test(ua)) {
      // Venmo Android app link
      return baseUrl.replace(
        "https://account.venmo.com/pay",
        "venmo://paycharge"
      );
    }
    // Default: web link
    return baseUrl;
  }

  function venmoSmartRedirect(event, baseUrl) {
    event.preventDefault();
    var link = getVenmoLink(baseUrl);
    window.location.href = link;
  }

  // Attach listeners after DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    var anchors = document.querySelectorAll(
      'a[href^="https://account.venmo.com/pay"]'
    );
    anchors.forEach(function (a) {
      var baseUrl = a.getAttribute("href");
      a.addEventListener("click", function (e) {
        venmoSmartRedirect(e, baseUrl);
      });
    });
  });
})();
