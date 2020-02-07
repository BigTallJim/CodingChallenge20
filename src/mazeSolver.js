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
        if (apiSplit[i].length > 2){
            junctionArray.push([stepCount, apiSplit[i].charAt(2)])
        }
    };
    return junctionArray;
}

MazeSolver.prototype.makeMove = async function(locationKey, command, repeat) {
    // const apiResponse = mazeApiCall(locationKey, command, repeat).then((response) => { console.log('response: ', response);});
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
    let xFound = false;
    let locationID = await mazeApiCall();
    const startID = locationID.split(',')[0];
    console.log('start', startID);

    let steps = this.lookForX(locationID);
    if (steps) xFound = true

    console.log('initial steps', steps);
    
    const junctions = this.findJunctions(locationID);
    console.log('junctions', junctions);

    for (let i = 0; i < junctions.length; i++) {
        let newLocation = await this.makeMove(startID, 'M', junctions[i][0])
        // let turnLocation = await this.makeMove(newLocation, junctions[i][1])
        this.addJunctionStatus(newLocation, junctions[i][1]);
    }

    console.log('junction array', this.junctionStatusArray);

    for (var i = 0; i < this.junctionStatusArray.length && !xFound; i++) {
        let item = this.junctionStatusArray[i]
        console.log('item', item);
        apiResponse = await mazeApiCall(item[0], item[1]);
        locationID = apiResponse.split(',')[0];
        console.log('api response', apiResponse);
        console.log('locationID:',locationID);

        steps = this.lookForX(apiResponse);
        if (steps) xFound = true

        console.log('steps to X', steps);

        const junctions2 = this.findJunctions(apiResponse);
        console.log('new juctions', junctions2);
        
        for (let i = 0; i < junctions2.length; i++) {
            let newLocation = await this.makeMove(locationID, 'M', junctions2[i][0])
            this.addJunctionStatus(newLocation, junctions2[i][1]);
        }        
    }
    if (xFound = true) {
        const xLocation = await this.makeMove(locationID, 'M', steps)
        console.log(xLocation)
        console.log(this.junctionStatusArray)
    }
}