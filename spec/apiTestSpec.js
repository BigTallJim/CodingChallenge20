describe('Testing apiTest', function(){

  it("It returns 1 when passed 1", async function(){
    const result = await ApiTest();
    expect(result).toEqual("MSwxLEU=,O,O,O,O,O,OR,O,O,O,O,OR");
  });
});