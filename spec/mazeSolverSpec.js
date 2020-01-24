describe('MazeSolver', function(){
  beforeEach(function() {
    mazeSolver = new MazeSolver();
  });

    it("finds next map junction", function(){
      let apiResponse = "strtRef=,0,0L"
      let steps = mazeSolver.findJunctions(apiResponse)
      console.log(steps);
      expect(steps).toEqual([[2,'L']]);
    });

    it("finds slightly further map junction", function(){
      let apiResponse = "strtRef=,0,0,0L"
      let steps = mazeSolver.findJunctions(apiResponse)
      console.log(steps);
      expect(steps).toEqual([[3,"L"]]);
    });

    it("actual api call step check", function(){
      let apiResponse = "MSwxLEU=,O,O,O,O,O,OR,O,O,O,O,OR"
      let steps = mazeSolver.findJunctions(apiResponse)
      console.log(steps);
      expect(steps).toEqual([[6,'R'],[11,'R']]);
    });

    it("moves to junction", async function(){
      let locationKey = 'MSwxLEU';
      let command = 'M';
      let repeat = 6;
      let key = await mazeSolver.makeMove(locationKey, command, repeat)
      expect(key).toEqual('NywxLEU');
    });

    it("moves to another junction", async function(){
        let locationKey = 'MSwxLEU';
        let command = 'M';
        let repeat = 11;
        let key = await mazeSolver.makeMove(locationKey, command, repeat)
        expect(key).toEqual('MTIsMSxF');
      });
  });