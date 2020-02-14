function MazeMapper(mazeArray) {
    let xCount = 0;
    let yCount = 0;

    let outputArray = [[0,0]];
    mazeArray.forEach(element => {
        let steps = element.split(",")
        steps.forEach(element => {
            yCount++;
            outputArray.push([xCount,yCount]);
            if (element.includes("R")){
                xCount++;
                outputArray.push([xCount,yCount]);
            }
            if (element.includes("L")){
                xCount--;
                outputArray.push([xCount,yCount]);
            }
        });
    });
    console.log(outputArray);
    return outputArray;
}