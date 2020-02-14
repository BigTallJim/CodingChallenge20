describe('MazeMapper', function(){
    // beforeEach(function() {
    //   mazeSolver = new MazeSolver();
    // });
  
      it("takes an array input", function(){
        let result = [[" "," "," "],["0","0"," "],["0"," "," "]]
        let maze = MazeMapper("0,0R","0")
        expect(maze).toEqual(result);
      });
})

