describe('MazeSolver2', function(){
  beforeEach(function() {
    mazeSolver2 = new MazeSolver2();
  });
    
  it("creates a mazeMap", function(){
      // debugger
      console.log(mazeSolver2.mazeMap)
      let result = [[0,0],[0,1],[0,2],[-  1,2]]
      // let result = [[" "," "," "],["0","0"," "],["0"," "," "]]
      mazeSolver2.findJunctions("strtRef=,0,0L")
      expect(mazeSolver2.mazeMap).toEqual(result);
    })

  });