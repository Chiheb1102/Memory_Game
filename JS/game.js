document.querySelector(".control-buttons span").onclick = function() {
    let name = prompt("What Is Your Name")
    document.querySelector(".info-container .name span").textContent = name
    document.querySelector(".control-buttons").remove()
}

let blocksContainer = document.querySelector(".memory-game-blocks")
let blocksContainerArr = [...blocksContainer.children]
let orderRange = [...Array(blocksContainerArr.length).keys()]

blocksContainerArr.forEach((block) => {
    block.style.order = orderRange[Math.floor(Math.random()*blocksContainerArr.length)]
})

blocksContainerArr.forEach((block) => {
    block.addEventListener("click", function() {
        flipBlock(block)
    })
})

function flipBlock(selected) {
    selected.classList.add("is-flipped")
    let allFlippedBlocks = blocksContainerArr.filter((FlippedBlock) => FlippedBlock.classList.contains("is-flipped"))
    if(allFlippedBlocks.length == 2) {
        stopClicking()
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
    }
}

function stopClicking() {
    blocksContainer.classList.add("no-clicking")
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking")
    }, 1000)
}

function checkMatchedBlocks(fBlock, sBlock) {
    let tries = document.querySelector(".tries span")
    if(fBlock.dataset.technology === sBlock.dataset.technology) {
        fBlock.classList.remove("is-flipped")
        sBlock.classList.remove("is-flipped")
        fBlock.classList.add("has-match")
        sBlock.classList.add("has-match")
        document.getElementById("success").play()
    }else {
        // tries.innerHTML ++;
        tries.innerHTML = parseInt(tries.innerHTML)+1;
        setTimeout(() => {
            fBlock.classList.remove("is-flipped")
            sBlock.classList.remove("is-flipped")
            document.getElementById("fail").play()
        }, 1000)
    }
}