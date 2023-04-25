const arrInput = document.getElementById('arr');
const sortBtn = document.getElementById('sort-btn');
const outputDiv = document.getElementById('output');

function visualize(arr, index1, index2) {
    let html = '';
    for (let i = 0; i < arr.length; i++) {
        let className = 'bar';
        if (i === index1 || i === index2) {
            className += ' active';
        }
        if (i < arr.length - sortedCount) {
            className += ' sorted';
        }
        html += `<div class="${className}" style="height: ${arr[i]}px"></div>`;
    }
    outputDiv.innerHTML = html;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                visualize(arr, j, j + 1);
                await sleep(100);
            }
        }
    }
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        visualize(arr, i, minIndex);
        await sleep(100);
    }
}

async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            visualize(arr, j, j + 1);
            await sleep(100);
            j--;
        }
        arr[j + 1] = key;
        visualize(arr, i, j + 1);
        await sleep(100);
    }
}

let sortedCount = 0;

function reset() {
    sortedCount = 0;
    outputDiv.innerHTML = '';
}

//functions are written for three sorts and can be used simultaneously
sortBtn.addEventListener('click', async () => {
    reset();
    const arrStr = arrInput.value.trim();
    const arr = arrStr.split(',').map(str => Number(str.trim()));
    /*
    await bubbleSort(arr.slice());
     sortedCount = arr.length;
     await selectionSort(arr.slice());
     sortedCount = arr.length;
    */
    await insertionSort(arr.slice());
    sortedCount = 0;
});