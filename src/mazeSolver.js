function MazeSolver() {

}

MazeSolver.prototype.findJunctions = function(apiResponse){
    let apiSplit = apiResponse.split(',');
    let i = 1;
    let stepCount = 0;
    let junctionArray = [];
    
    for (i=1; i< apiSplit.length;i++){
        stepCount++;
        if (apiSplit[i].length > 1){
            junctionArray.push([stepCount, apiSplit[i].charAt(1)])
        }
    };
    return junctionArray;
}

MazeSolver.prototype.makeMove = async function(locationKey, command, repeat) {
    const apiResponse = await mazeApiCall(locationKey, command, repeat);
    console.log('here => ', apiResponse)
    const apiSplit = apiResponse.split(',')[0]
    console.log(apiSplit)
    return apiSplit
}

MazeSolver.prototype.lookForX = function(corridorView) {
    let corridorSplit = corridorView.split(',');
    let i = 1;
    let stepCount = 0;
    let xLocation;
    
    for (i=1; i< corridorSplit.length;i++){
        stepCount++;
        if (corridorSplit[i] == 'X'){
            xLocation = stepCount;
        }
    };
    return xLocation;
}