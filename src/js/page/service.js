const button_active_side_menu = document.getElementById("button-active-side-menu")
const container_side_menu = document.getElementById("container-side-menu")

button_active_side_menu.addEventListener('click', activeSideMenu)

function activeSideMenu() {
    container_side_menu.classList.toggle('active')
}