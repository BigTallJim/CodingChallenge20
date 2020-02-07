describe('MazeSolver', function(){
  beforeEach(function() {
    mazeSolver = new MazeSolver();
  });

    it("finds next map junction", function(){
      let apiResponse = "strtRef=,0,0L"
      let steps = mazeSolver.findJunctions(apiResponse)
      expect(steps).toEqual([[2,'L']]);
    });

    it("finds slightly further map junction", function(){
      let apiResponse = "strtRef=,0,0,0L"
      let steps = mazeSolver.findJunctions(apiResponse)
      expect(steps).toEqual([[3,"L"]]);
    });

    it("actual api call step check", function(){
      let apiResponse = "MSwxLEU=,O,O,O,O,O,OR,O,O,O,O,OR"
      let steps = mazeSolver.findJunctions(apiResponse)
      expect(steps).toEqual([[6,'R'],[11,'R']]);
    });

    it("moves to junction", async function(){
      let locationKey = 'MSwxLEU';
      let command = 'M';
      let repeat = 6;
      let key = await mazeSolver.makeMove(locationKey, command, repeat)
      expect(key).toEqual('NywxLEU=');
    });

    it("after moving 6 turn right", async function(){
      let locationKey = 'NywxLEU';
      let command = 'R';
      let repeat;
      let key = await mazeSolver.makeMove(locationKey, command, repeat)
      expect(key).toEqual('NywxLFM=');
    });

    it("moves to another junction", async function(){
        let locationKey = 'MSwxLEU';
        let command = 'M';
        let repeat = 11;
        let key = await mazeSolver.makeMove(locationKey, command, repeat)
        expect(key).toEqual('MTIsMSxF');
    });

    it("after moving 11 turn right", async function(){
      let locationKey = 'MTIsMSxF';
      let command = 'R';
      let repeat;
      let key = await mazeSolver.makeMove(locationKey, command, repeat)
      expect(key).toEqual('MTIsMSxT');
    });

    it("check corridor for X", function(){
      corridorView = "MSwxLEU=,O,O,O,X,O,OR,O,O,O,O,OR"
      stepsToX = mazeSolver.lookForX(corridorView);
      expect(stepsToX).toEqual(4);
    });

    it("check corridor for X", function(){
      corridorView = "MSwxLEU=,O,O,O,O,O,OR,O,O,O,O,OR"
      stepsToX = mazeSolver.lookForX(corridorView);
      expect(stepsToX).toEqual(undefined);
    });

    it("stores junctions and investigation status", function(){
      junction = 'MSwxLEU'
      direction = 'R'
      junctionStatusArray = mazeSolver.addJunctionStatus(junction, direction)
      expect(junctionStatusArray[0]).toEqual([junction, direction, false]);
    });

    it("NO store duplicate", function(){
      let junction = 'MSwxLEU'
      let direction = 'R'
      junctionStatusArray = mazeSolver.addJunctionStatus(junction, direction)
      junctionStatusArray = mazeSolver.addJunctionStatus(junction, direction)
      expect(junctionStatusArray.length).toEqual(1);
    });

    it("runs the mainline", async function(){
      const xLocation = await mazeSolver.mainLine();
      expect(xLocation).toEqual('MTQsMSxO');
    });
  });