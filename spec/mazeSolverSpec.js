describe('MazeSolver', function(){

    it("creates a map", function(){
      const mazeSolver = new MazeSolver()
      const apiResponse = "strtRef=,0,0L"
      const steps = mazeSolver.findNextJunction(apiResponse)
      expect(steps).toEqual(2);
    });
  });