/*
* presets.js
*/

console.log("loadings presets...");

/* TO DO
*  - add max step
*  - organize presets ? 
*  PRECEDENCE - CS > CF
*  IGNORE - during context matching
*/

const presets = [
    {
        name:  "1",
        axiom: "F",
        rules: [["F", ["F[+F]F[-F]F",
                       "F[+F]F",
                       "F[-F]F"]]],
        ignore: [""],
        generation: 5,
        base_angle: 25.7,
        max_step: 6,
    },
    {
        name:  "2",
        axiom: "F",
        rules: [["F", ["F[+F]F[-F][F]",
                       "F[+F]F",
                       "F[-F][F]"]]],
        ignore: [""],
        generation: 5,
        base_angle: 20,
        max_step: 15,
    },
    {
        name:  "3",
        axiom: "F",
        rules: [["F", ["FF-[-F+F+F]+[+F-F-F]"]]],
        ignore: [""],
        generation: 4,
        base_angle: 22.5,
        max_step: 10,
    },
    {
        name:  "4",
        axiom: "X",
        rules: [["F", ["FF"]], 
                ["X", "F[+X]F[-X]+X"]], 
        ignore: [""],
        generation: 7,
        base_angle: 20,
        max_step: 2.5,
    },
    {
        name:  "5",
        axiom: "X",
        rules: [["F", ["FF"]],
                ["X", "F[+X][-X]FX"]], 
        ignore: [""],
        generation: 7,
        base_angle: 25.7,
        max_step: 2.5,
    },
    {
        name:  "6",
        axiom: "X",
        rules: [["F", ["FF"]], 
                ["X", "F-[[X]+X]+F[+FX]-X"]], 
        ignore: [""],
        generation: 5,
        base_angle: 22.5,
        max_step: 6,
    },
];
