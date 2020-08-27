// Import the js file to test
import { checkDate } from "../dateChecker"
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("check whether first date is earlier than second date", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the checkDate() function", () => {
           expect(checkDate(new Date("2020", "07", "19"),new Date("2020", "07", "20"))).toBeTruthy();
           expect(checkDate(new Date("2020", "07", "19"),new Date("2020", "07", "18"))).toBeFalsy();
})});