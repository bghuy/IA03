document.addEventListener("DOMContentLoaded", function () {
    // Lấy các phần tử cần sử dụng
    const switchCheckbox = document.getElementById(
        "flexSwitchCheckDefault"
    );
    const textDiv = document.querySelectorAll(".h3");
    const textH5 = document.querySelectorAll(".h5");
    const textH1 = document.querySelectorAll(".h1");
    const houseIcon = document.querySelector(".fa-house");
    const bodyElement = document.body;
    const header = document.querySelector("header");
    const sunIcon = document.querySelector(".fa-sun");
    const moonIcon = document.querySelector(".fa-moon");
    const footer = document.querySelector("footer");
    const nav = document.querySelector("nav");

    // Gắn sự kiện click cho checkbox
    switchCheckbox.addEventListener("click", function () {
        // Kiểm tra trạng thái của checkbox
        if (switchCheckbox.checked) {
            // Nếu checkbox được chọn, thay đổi màu nền của body thành màu đen
            bodyElement.style.backgroundColor = "black";
            textDiv.forEach((element) => {
                element.style.color = "white";
            });
            textH5.forEach((element) => {
                element.style.color = "white";
            });
            textH1.forEach((element) => {
                element.style.color = "white";
            });
            houseIcon.style.color = "white";
            header.style.backgroundColor = "#82271d";
            sunIcon.style.display = "none";
            moonIcon.style.display = "inline";
            nav.style.backgroundColor = "#2739b0";
        } else {
            // Nếu checkbox không được chọn, thay đổi màu nền của body về mặc định
            bodyElement.style.backgroundColor = "";
            textDiv.forEach((element) => {
                element.style.color = "";
            });
            textH5.forEach((element) => {
                element.style.color = "";
            });
            textH1.forEach((element) => {
                element.style.color = "";
            });
            houseIcon.style.color = "white";
            header.style.backgroundColor = "lightsalmon";
            sunIcon.style.display = "inline";
            moonIcon.style.display = "none";
            nav.style.backgroundColor = "silver";
        }
    });
});