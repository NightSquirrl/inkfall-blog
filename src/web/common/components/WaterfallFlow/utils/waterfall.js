let Waterfall = function (options) {
    this.el = document.getElementsByClassName(options.el)[0];
    this.oItems = this.el.getElementsByTagName("div")
    this.column = options.column;
    this.gap = options.gap;
    this.itemWidth = (this.el.offsetWidth - (this.column - 1) * this.gap) / this.column;
    this.heighArray = []
    this.init()
};


Waterfall.prototype.init = function () {
    this.render();
};
Waterfall.prototype.render = async function () {
    let item = null
    let minIndex = -1;
    for (let index = 0; index < this.oItems.length; index++) {
        item = this.oItems[index];
        item.style.width = this.itemWidth + "px";

        if (index < this.column) {
            item.style.top = "0px"
            item.style.left = index * (this.itemWidth + this.gap) + "px";
            this.heighArray.push(await getItemHeight(item))
        } else {

            let minIndex = getMinIndex(this.heighArray)
            item.style.left = this.oItems[minIndex].offsetLeft + "px";
            item.style.top = this.heighArray[minIndex] + this.gap + "px"
            this.heighArray[minIndex] += item.offsetHeight + this.gap
        }
    }
}

function getMinIndex(heightArray) {
    return heightArray.indexOf(Math.min.apply(null, heightArray))
}

function getItemHeight(item) {
    return new Promise((resolve) => {
        item.getElementsByTagName("img")[0].onload = (event) => {
            resolve(event.target.offsetHeight)
        }
    })
}

export default Waterfall
