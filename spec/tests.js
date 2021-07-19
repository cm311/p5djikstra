describe("Canvas Testing", function() {
    
    it("The canvas should exist", function() {
        expect(canvas).toBeDefined();  
    });
    
    it("The canvas width should be a p5.js canvas object", function() {
        expect(canvas.className).toEqual("p5Canvas");
    });
    
    it("The canvas should have a parent div named 'sketch-holder' in the DOM", function() {
        expect(canvas.parentNode.id).toEqual("sketch-holder");
    });
    
});