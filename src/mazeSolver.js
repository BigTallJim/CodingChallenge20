function MazeSolver() {
    this.junctionStatusArray = [];
    this.xFound = false;
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
        if (apiSplit[i].length > 2){
            junctionArray.push([stepCount, apiSplit[i].charAt(2)])
        }
    };
    return junctionArray;
}

MazeSolver.prototype.makeMove = async function(locationKey, command, repeat) {
    const apiResponse = await mazeApiCall(locationKey, command, repeat)
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
    let duplicate = this.junctionStatusArray.some(item => item[0] === junction && item[1] === direction);
    if (!duplicate){
        this.junctionStatusArray.push([junction, direction, false]);
    }
    return this.junctionStatusArray
}

MazeSolver.prototype.mainLine = async function(){

    // temp = this.makeMove();
    let locationID = await mazeApiCall();
    const startID = locationID.split(',')[0];

    let steps = this.lookForX(locationID);
    if (steps) this.xFound = true

    
    const junctions = this.findJunctions(locationID);

    for (let i = 0; i < junctions.length; i++) {
        let newLocation = await this.makeMove(startID, 'M', junctions[i][0])
        // let turnLocation = await this.makeMove(newLocation, junctions[i][1])
        this.addJunctionStatus(newLocation, junctions[i][1]);
    }

    for (var i = 0; i < this.junctionStatusArray.length && !this.xFound; i++) {
        let item = this.junctionStatusArray[i]
        apiResponse = await mazeApiCall(item[0], item[1]);
        locationID = apiResponse.split(',')[0];
        steps = this.lookForX(apiResponse);
        
        if (steps)this.xFound = true
        
        const junctions2 = this.findJunctions(apiResponse);
        
        for (let i = 0; i < junctions2.length; i++) {
            let newLocation = await this.makeMove(locationID, 'M', junctions2[i][0])
            this.addJunctionStatus(newLocation, junctions2[i][1]);
        }        
    }
    if (this.xFound = true) {
        const xLocation = await this.makeMove(locationID, 'M', steps)
        console.log(xLocation)
        return xLocation
    } else {
        return 'x not found'
    }
}