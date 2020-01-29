function MazeSolver() {
    this.junctionStatusArray = [];
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
    // const apiResponse = mazeApiCall(locationKey, command, repeat).then((response) => { console.log('response: ', response);});
    const apiResponse = await mazeApiCall(locationKey, command, repeat)
    console.log('here => ', apiResponse)
    const apiSplit = apiResponse.split(',')[0]
    return apiSplit
}

MazeSolver.prototype.lookForX = function(corridorView) {
    let corridorSplit = corridorView.split(',');
    let i = 1;
    let stepCount = 0;
    let xLocation;
    
    for (i=1; i< corridorSplit.length;i++){
        stepCount++;
        if (corridorSplit[i] === 'X'){
            xLocation = stepCount;
        }
    };
    return xLocation;
}

MazeSolver.prototype.addJunctionStatus = function(junction, direction) {
    this.junctionStatusArray.push([junction, direction, false]);
    return this.junctionStatusArray
}

MazeSolver.prototype.mainLine = async function(){
    // temp = this.makeMove();
    const startPoint = await mazeApiCall();
    const startID = startPoint.split(',')[0];
    console.log(startID);

    const steps = this.lookForX(startPoint);
    console.log(steps);
    
    const junctions = this.findJunctions(startPoint);
    console.log(junctions);

    for (let i = 0; i < junctions.length; i++) {
        let newLocation = await this.makeMove(startID, 'M', junctions[i][0])
        // let turnLocation = await this.makeMove(newLocation, junctions[i][1])
        this.addJunctionStatus(newLocation, junctions[i][1]);
    }

    console.log(this.junctionStatusArray);

    this.junctionStatusArray.forEach(async (item) => {
        console.log(item);
        apiResponse = await mazeApiCall(item[0], item[1]);
        console.log(apiResponse);

        let steps = this.lookForX(apiResponse);
        console.log(steps);
        // junctionStatusArray.push("Test",false);
        
    })
}