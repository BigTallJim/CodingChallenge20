describe('MazeMapper', function(){
    // beforeEach(function() {
    //   mazeSolver = new MazeSolver();
    // });
  
      it("takes an array input", function(){
        let result = [[0,0],[0,1],[0,2],[1,2]]
        // let result = [[" "," "," "],["0","0"," "],["0"," "," "]]
        let maze = MazeMapper(["0,0R"])
        expect(maze).toEqual(result);
      });

      it("takes an different array input", function(){
        let result = [[0,0],[0,1],[0,2],[-1,2]]
        let maze = MazeMapper(["0,0L"])
        expect(maze).toEqual(result);
      });
      it("takes an different array input", function(){
        let result = [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,6],[0,7],[0,8],[0,9],[0,10],[0,11],[1,11]]
        let maze = MazeMapper(["O,O,O,O,O,OR,O,O,O,O,OR"])
        expect(maze).toEqual(result);
      });
      it("copes with L, R and LR", function(){
        let result = [[0,0],[0,1],[0,2],[0,3],[-1,3],[1,3],[0,4],[0,5],[0,6],[-1,6],[0,7],[0,8],[0,9],[0,10],[0,11],[1,11]]
        let maze = MazeMapper(["O,O,OLR,O,O,OL,O,O,O,O,OR"])
        expect(maze).toEqual(result);
      });
})

