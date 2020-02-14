describe('MazeSolver2', function(){
  beforeEach(function() {
    mazeSolver2 = new MazeSolver2();
  });
    
  it("creates a mazeMap", function(){
      // debugger
      console.log(mazeSolver2.mazeMap)
      let result = [[0,0],[0,1],[0,2]]
      mazeSolver2.mapMaze([0,0], "N", "0,0L")
      expect(mazeSolver2.mazeMap).toEqual(result);
  })

  it("creates a mazeMap with second corridor", function(){
    let result = [[0,0],[0,1],[0,2],[-1,2],[-2,2]]
    mazeSolver2.mapMaze([0,0], "N", "0,0L");
    mazeSolver2.mapMaze([0,2],"W","0,0");
    expect(mazeSolver2.mazeMap).toEqual(result);
  })

});