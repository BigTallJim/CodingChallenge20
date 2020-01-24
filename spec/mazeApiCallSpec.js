describe('Testing api call', function(){

  it("It returns response", async function(){
    const result = await mazeApiCall();
    expect(result).toEqual("MSwxLEU=,O,O,O,O,O,OR,O,O,O,O,OR");
  });
});