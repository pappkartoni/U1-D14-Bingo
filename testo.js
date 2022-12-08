// Comparison of using splice vs shuffling the array
function fillArray(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(i + 1);
    }
    return arr;
};

// Fischer-Yates shuffle O(n)
function shuffleNumbers1(numArray) { // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    for (let i=0;i<numArray.length-1; i++) {
        let j = Math.floor(Math.random() * (numArray.length - i)) + i;
        let swp = numArray[i];
        numArray[i] = numArray[j];
        numArray[j] = swp;
    }

    return numArray;
}

// Splicing of the randomly chosen number 
function getRandomNum(range) {
    let randIndex = Math.floor(Math.random() * range.length);
    let random = range.splice(randIndex, 1)[0];
    return random;
};

// Comparison function of the two methods
// n: max value in number arrays
// m: number of draws
// e.g. calling comparer(76, 24) would lead us to the homework's values 
function comparer(n, m) {
    // two arrays because splice removes elements from the array it works on 
    let nums1 = fillArray(n);
    let nums2 = fillArray(n);

    // Start of splice method
    let d1 = performance.now()
    //console.log("Splicing method start time: ", d1)
    for (let i = 0; i < m; i++) {
        let rn = getRandomNum(nums1);
        // if (i % 1000 == 0) { //uncomment to see some values
        //     console.log("Number:", i, rn)
        // }
    }

    // End of splice method
    let d2 = performance.now()
    //console.log("Splicing method end time: ", d2)

    let tdif1 = d2 - d1;
    //console.log("Splicing method time diff: ", tdif1)

    // Start of array shuffle method
    let d3 = performance.now()
    //console.log("Array shuffle method start time: ", d3)
    let randonums = shuffleNumbers1(nums2);
    for (let j = 0; j < m; j++) {
        let rn = randonums[j];
        // if (j % 1000 == 0) { //uncomment to see some values
        //     console.log("Number:", j, rn)
        // }
    }

    let d4 = performance.now()
    //console.log("Array shuffle method end time: ", d4)
    let tdif2 = d4 - d3;
    //console.log("Array shuffle time diff: ", tdif2)

    // return both values for comparison
    return [tdif1, tdif2]
}

let looper = function(n, m, iter) {
    let sum1 = 0;
    let sum2 = 0;
    values = [];
    for (let i = 0; i < iter; i++) {
        values = comparer(n, m);
        sum1 += values[0];
        sum2 += values[1];
    }

    console.log(`Doing both methods ${iter} times with n=${n} and m=${m} leads us to total durations of:`);
    console.log(` Splicing:  ${sum1}ms`);
    console.log(` Shuffling: ${sum2}ms`);
    return [sum1, sum2];
}

looper(75, 24, 10000);