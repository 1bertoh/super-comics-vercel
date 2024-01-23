item = document.getElementById("item");
info = document.getElementById("info-item");

item.addEventListener("mouseover", () => {
    item.classList.replace("item", "item-big");
    setTimeout(() => {
        info.classList.replace("info-item", "info-item-show");
    }, 500);
});

item.addEventListener("mouseout", () => {
    info.classList.replace("info-item-show", "info-item");
    setTimeout(() => {
        item.classList.replace("item-big", "item");
    }, 100);
});
