// Alternar o menu no mobile
document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.querySelector(".menu");
    if (menu.Style.display === "block") {
        menu.Style.display = "none";
    } else {
        menu.style.display = "block";
    }
});