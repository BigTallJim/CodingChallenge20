function MazeSolver2() {
    this.junctionStatusArray = [];
    this.xFound = false;
    this.locationID = undefined;
    this.steps = undefined;
    this.mazeMap = [[0,0]];
    this.currentDirection = 'N';
    this.xCount = 0;
    this.yCount = 0;
}

MazeSolver2.prototype.findJunctions = function(apiResponse){
    // debugger
    let apiSplit = apiResponse.split(',');
    let stepCount = 0;
    let junctionArray = [];
    
    for (i=1; i< apiSplit.length;i++){
        stepCount++;
        if (apiSplit[i].length > 1){
            junctionArray.push([stepCount, apiSplit[i].charAt(1)])
        }
        if (apiSplit[i].length > 2){
            junctionArray.push([stepCount, apiSplit[i].charAt(2)])
        }
        this.mapMaze(apiSplit[i]);
        
    };
    // return this.mazeMap
    return junctionArray;
}

MazeSolver2.prototype.mapMaze = function(direction) {
    this.yCount++;
    this.mazeMap.push([this.xCount,this.yCount]);
    if (direction.includes("L")){
        this.xCount--;
        this.mazeMap.push([this.xCount,this.yCount]);
        this.xCount++
    }
    if (direction.includes("R")){
        this.xCount++;
        this.mazeMap.push([this.xCount,this.yCount]);
        this.xCount--
    }
};

MazeSolver2.prototype.makeMove = async function(locationKey, command, repeat) {
    const apiResponse = await mazeApiCall(locationKey, command, repeat)
    const apiSplit = apiResponse.split(',')[0]
    return apiSplit
}


MazeSolver2.prototype.lookForX = function(corridorView) {
    let corridorSplit = corridorView.split(',');
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

MazeSolver2.prototype.addJunctionStatus = function(junction, direction) {
    let duplicate = this.junctionStatusArray.some(item => item[0] === junction && item[1] === direction);
    if (!duplicate){
        this.junctionStatusArray.push([junction, direction, false]);
    }
    return this.junctionStatusArray
}

MazeSolver2.prototype.checkAndStore = async function(apiResponse){
    this.locationID = apiResponse.split(',')[0];
    steps = this.lookForX(apiResponse);
    if (steps) this.xFound = true;
    await this.storeJunctions(apiResponse);
}

MazeSolver2.prototype.storeJunctions = async function(apiResponse){
    const junctions = this.findJunctions(apiResponse);

    for (let i = 0; i < junctions.length; i++) {
        let newLocation = await this.makeMove(this.locationID, 'M', junctions[i][0])
        this.addJunctionStatus(newLocation, junctions[i][1]);
    }
}

MazeSolver2.prototype.finalReporting = async function(){
    if (this.xFound = true) {
        console.log(this.junctionStatusArray);
        const xLocation = await this.makeMove(this.locationID, 'M', steps)
        console.log(xLocation)
        return xLocation
    } else {
        return 'x not found'
    }
}

MazeSolver2.prototype.mainLine = async function(){
    let apiResponse = await mazeApiCall();
    await this.checkAndStore(apiResponse);

    for (var i = 0; i < this.junctionStatusArray.length && !this.xFound; i++) {
        let item = this.junctionStatusArray[i]
        apiResponse = await mazeApiCall(item[0], item[1]);
        await this.checkAndStore(apiResponse);        
    }

    return await this.finalReporting();
}