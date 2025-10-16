// script.js
document.addEventListener("DOMContentLoaded", function () {
  fetch("Sidebar.html")
    .then(res => res.text())
    .then(data => {
      const mainContainer = document.querySelector('.main-container');
      mainContainer.insertAdjacentHTML('afterbegin', data);

      // Sidebar interactivity
      $(".sidebar ul li").on('click', function () {
        $(".sidebar ul li.active").removeClass('active');
        $(this).addClass('active');
      });

      $('.open-btn').on('click', function () {
        $('.sidebar').addClass('active');
      });

      $('.close-btn').on('click', function () {
        $('.sidebar').removeClass('active');
      });
    });
});
