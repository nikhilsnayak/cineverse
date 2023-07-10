export function cardScroller() {
    const cardContainer = document.querySelector('.card-container');
    const leftBtn = document.getElementById('left-arrow');
    const rightBtn = document.getElementById('right-arrow');

    function getCardWidth() {
        const flexContainer = document.querySelector('.card-container');
        const flexItem = document.querySelector('.card');
        const flexContainerStyles = window.getComputedStyle(flexContainer);
        const flexItemWidth = flexItem.offsetWidth;
        const gapValue = parseFloat(flexContainerStyles.columnGap);
        const totalWidth = flexItemWidth + gapValue;
        return totalWidth;
    }


    leftBtn.addEventListener('click', () => {
        cardContainer.scrollLeft -= getCardWidth()
    })
    rightBtn.addEventListener('click', () => {
        cardContainer.scrollLeft += getCardWidth()
    })
}