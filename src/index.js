function getCombinationsUpTo(a, l){
  var allCombinations = new Array(a.length);
  var upperBound = Math.floor(a.length/2);
  for(var k=1;k<=upperBound;k++){
    var splitCombinations = buildNextBasedPrev(a, allCombinations[k-1]);
    allCombinations[k] = splitCombinations.nextIndexes;
    allCombinations[a.length-k] = splitCombinations.complementNextIndexes
  }
  return allCombinations;
}

function buildNextBasedPrev(a, prevIndexes){
  var pBunches = prevIndexes || [];
  var resultCombinations = [];
  var complementResultCombinations = [];
  var nextPrevBunches = pBunches[0] || [];
  var r=0;
  do{
    var bunchOfCombinations = [];
    var complementBunches = [];
    var lastIndex = pBunches.length
                      ? pBunches[r][pBunches[r].length - 1].index
                      : -1;
    for(let i=lastIndex+1;i<a.length;i++){
      var combination = nextPrevBunches.concat({ index: i, item: a[i] });
      bunchOfCombinations.push(combination);


      complementBunches.push(getComplimentCombination(a, combination));
    }
    resultCombinations = resultCombinations.concat(bunchOfCombinations);
    complementResultCombinations = complementResultCombinations.concat(complementBunches);
    nextPrevBunches = pBunches[++r]
  }while(nextPrevBunches)
  return { nextIndexes: resultCombinations, complementNextIndexes: complementResultCombinations };
}

function getComplimentCombination(a, combination){
  var complementCombination = []
  for(let i=0;i<a.length;i++){
    if (combination.every((c) => { return c.index !== i; }))
      complementCombination.push({ index: i, item: a[i] });
  }
  return complementCombination;
}

function displayCombinations(combinationSets){
  for(var k=1;k<combinationSets.length;k++){
    console.log(`combinations length is ${k}`);
    for(var i=0;i<combinationSets[k].length;i++){
      console.log(combinationSets[k][i].map((c) => c.item).join(','));
    }
  }
}

var testA = ['a', 'b', 'c', 'd', 'e', 'f'];
var result = getCombinationsUpTo(testA, 4);
displayCombinations(result);
